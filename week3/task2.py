# Week 3 — Task 2：PTT Steam 版爬蟲

import csv
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup

PTT_BASE_URL = "https://www.ptt.cc"
PTT_STEAM_INDEX = f"{PTT_BASE_URL}/bbs/Steam/index.html"
OUTPUT_DIR = Path(__file__).resolve().parent
PAGE_COUNT = 3
REQUEST_DELAY = 0.5
USER_AGENT = "Mozilla/5.0"
# 18歲以上才能瀏覽的網站
PTT_COOKIE = "over18=1"
DATE_PATTERN = re.compile(r"^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{1,2} \d{2}:\d{2}:\d{2} \d{4}$")


def fetch_html(url, cookies=PTT_COOKIE):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Cookie": cookies,
        },
    )
    with urllib.request.urlopen(request) as response:
        return response.read().decode("utf-8", errors="replace")

# 解析 推文數
def parse_push_count(nrec_element):
    if nrec_element is None:
        return 0

    text = nrec_element.get_text(strip=True)
    if not text:
        return 0
    if text.isdigit():
        return int(text)
    if all(char == "X" for char in text):
        if len(text) == 1:
            return 10
        if len(text) == 2:
            return 99
        return int("9" * len(text))
    if text == "爆":
        return 99

    return 0

# 解析 列表頁面
def parse_list_page(soup):
    # 初始化 文章列表
    articles = []

    for entry in soup.select("div.r-ent"):
        title_div = entry.select_one("div.title")
        if title_div is None:
            continue

        title = title_div.get_text(strip=True)
        if "(本文已被刪除)" in title:
            continue

        link = title_div.select_one("a")
        if link is None or not link.get("href"):
            continue

        push = parse_push_count(entry.select_one("div.nrec"))
        article_url = urllib.parse.urljoin(PTT_BASE_URL, link["href"])

        # 資料組合
        articles.append(
            {
                "title": title,
                "push": push,
                "url": article_url,
            }
        )

    return articles

# 翻頁
def get_prev_page_url(soup):
    for link in soup.select("div.btn-group-paging a"):
        if "上頁" in link.get_text(strip=True):
            href = link.get("href")
            if href:
                return urllib.parse.urljoin(PTT_BASE_URL, href)
    return None

# 抓取 內文頁時間
def fetch_article_time(article_url, cookies=PTT_COOKIE):
    html = fetch_html(article_url, cookies=cookies)
    soup = BeautifulSoup(html, "html.parser")

    for meta in soup.select("span.article-meta-value"):
        text = meta.get_text(strip=True)
        if DATE_PATTERN.match(text):
            return text

    return ""


def scrape_articles(page_count=PAGE_COUNT):
    articles = []
    seen_urls = set()
    current_url = PTT_STEAM_INDEX

    for _ in range(page_count):
        html = fetch_html(current_url)
        soup = BeautifulSoup(html, "html.parser")
        page_articles = parse_list_page(soup)

        for article in page_articles:
            if article["url"] in seen_urls:
                continue

            seen_urls.add(article["url"])
            time.sleep(REQUEST_DELAY)
            publish_time = fetch_article_time(article["url"])
            articles.append(
                {
                    "title": article["title"],
                    "push": article["push"],
                    "publish_time": publish_time,
                }
            )

        prev_url = get_prev_page_url(soup)
        if prev_url is None or prev_url == current_url:
            break

        current_url = prev_url
        time.sleep(REQUEST_DELAY)

    return articles


def write_articles_csv(articles, output_path):
    with open(output_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["ArticleTitle", "LikeCount", "PublishTime"])

        for article in articles:
            writer.writerow(
                [
                    article["title"],
                    article["push"],
                    article["publish_time"],
                ]
            )


def main():
    print(f"開始爬取 PTT Steam 前 {PAGE_COUNT} 頁...")
    articles = scrape_articles(PAGE_COUNT)
    output_path = OUTPUT_DIR / "articles.csv"
    write_articles_csv(articles, output_path)
    print(f"已寫入 {len(articles)} 篇文章 → {output_path.name}")


if __name__ == "__main__":
    main()
