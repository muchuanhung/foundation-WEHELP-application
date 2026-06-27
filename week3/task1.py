# Week 3 — Task 1：旅館資料合併

import csv
import json
import re
import urllib.request
from pathlib import Path

HOTELS_CH_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-ch"
)
HOTELS_EN_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-en"
)
OUTPUT_DIR = Path(__file__).resolve().parent


# 抓取 網路資料
def fetch_json(url):
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode("utf-8"))


# 建立 英文旅館資料的索引ID
def build_english_lookup(english_list):
    return {hotel["_id"]: hotel for hotel in english_list}

# 提取 中文地址中的行政區 ex: 臺北市大安區
def extract_district(chinese_address):
    match = re.search(r"臺?北市(.+?區)", chinese_address)
    return match.group(1) if match else ""

# 簡化 中文地址中的行政區 ex: 臺北市大安區 -> 大安區
def shorten_chinese_address(chinese_address):
    return re.sub(r"^臺?北市.+?區", "", chinese_address)

# 合併 中文和英文旅館資料
def merge_hotels(chinese_list, english_lookup):
    # 初始化 合併後的旅館資料
    hotels = []

    # 遍歷 中文旅館資料
    for chinese_hotel in chinese_list:
        hotel_id = chinese_hotel["_id"]
        english_hotel = english_lookup.get(hotel_id, {})
        full_address = chinese_hotel["地址"]

        # 資料組合
        hotels.append(
            {
                "chinese_name": chinese_hotel["旅宿名稱"],
                "english_name": english_hotel.get("hotel name", ""),
                "chinese_address": shorten_chinese_address(full_address),
                "english_address": english_hotel.get("address", ""),
                "phone": chinese_hotel["電話或手機號碼"],
                "room_count": int(chinese_hotel["房間數"]),
                "district": extract_district(full_address),
            }
        )

    return hotels

# 寫入 旅館資料
def write_hotels_csv(hotels, output_path):
    with open(output_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(
            [
                "ChineseName",
                "EnglishName",
                "ChineseAddress",
                "EnglishAddress",
                "Phone",
                "RoomCount",
            ]
        )
        for hotel in hotels:
            writer.writerow(
                [
                    hotel["chinese_name"],
                    hotel["english_name"],
                    hotel["chinese_address"],
                    hotel["english_address"],
                    hotel["phone"],
                    hotel["room_count"],
                ]
            )

# 寫入 行政區資料
def write_districts_csv(hotels, output_path):
    stats = {}

    for hotel in hotels:
        district = hotel["district"]
        if district not in stats:
            # 初始化 行政區資料
            stats[district] = {"hotel_count": 0, "room_count": 0}

        # 統計 行政區的旅館數和房間數
        stats[district]["hotel_count"] += 1
        stats[district]["room_count"] += hotel["room_count"]

    # 寫入 行政區資料
    with open(output_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["District", "HotelCount", "RoomCount"])

        for district in sorted(stats):
            writer.writerow(
                [
                    district,
                    stats[district]["hotel_count"],
                    stats[district]["room_count"],
                ]
            )


def main():
    chinese_data = fetch_json(HOTELS_CH_URL)
    english_data = fetch_json(HOTELS_EN_URL)

    english_lookup = build_english_lookup(english_data["list"])
    hotels = merge_hotels(chinese_data["list"], english_lookup)

    hotels_path = OUTPUT_DIR / "hotels.csv"
    districts_path = OUTPUT_DIR / "districts.csv"

    write_hotels_csv(hotels, hotels_path)
    write_districts_csv(hotels, districts_path)

    print(f"已寫入 {len(hotels)} 筆旅館 → {hotels_path.name}")
    print(f"已寫入 {len(set(h['district'] for h in hotels if h['district']))} 個行政區 → {districts_path.name}")


if __name__ == "__main__":
    main()
