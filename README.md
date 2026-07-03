# Foundation WEHELP Application

第一階段課程作業專案，每週獨立資料夾。

## 線上預覽

- 首頁：https://muchuanhung.github.io/foundation-WEHELP-application/
- Week 1：https://muchuanhung.github.io/foundation-WEHELP-application/week1/
- Week 2（JS）：https://muchuanhung.github.io/foundation-WEHELP-application/week2/assign2.html
- Week 3：https://muchuanhung.github.io/foundation-WEHELP-application/week3/
- Week 4: 為 FastAPI 後端專案，需本地執行（見下方說明）。
- 申請問答：https://muchuanhung.github.io/foundation-WEHELP-application/application/

## 專案結構

```
week1/           # 第一週 RWD 切版
week2/           # 第二週程式題
  assign2.py     # Python 四題解答
  assign2.js     # JavaScript 四題解答
  assign2.html   # 瀏覽器預覽 JS 結果
week3/           # 第三週 資料抓取與視覺化
  task1.py       # Task 1：旅館 JSON 合併 → hotels.csv, districts.csv
  task2.py       # Task 2：PTT Steam 版爬蟲 → articles.csv
  index.html     # Task 3 & 4：景點渲染 + Load More
  task3.js
  styles.css
  public/icons/
week4/           # 第四週 FastAPI 登入與旅館查詢
  main.py        # FastAPI 入口
  hotel_data.py  # Task 4：旅館資料（Week 3 JSON）
  requirements.txt
  templates/     # Jinja2 模板
  static/        # CSS
application/     # WEHELP 申請問答
```

## Week 2 本地執行

```bash
# Python
python3 week2/assign2.py

# JavaScript（瀏覽器）
open week2/assign2.html
```

## Week 3 本地執行

```bash
# Task 1：旅館資料合併
python3 week3/task1.py

# Task 2：PTT 爬蟲
pip install beautifulsoup4
python3 week3/task2.py

# Task 3 & 4：景點渲染
cd week3 && python3 -m http.server 8080
# 瀏覽器開啟 http://localhost:8080/
```

## Week 4 本地執行

```bash
cd week4
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
# 瀏覽器開啟 http://127.0.0.1:8000/
```

- Task 1：首頁登入表單（`GET /`）
- Task 2：驗證登入（`POST /login`）、成功頁（`/member`）、錯誤頁（`/ohoh?msg=`）
- Task 3：Session 登入狀態（`/logout`）
- Task 4：旅館查詢（`/hotel/{id}`，測試編號例：`576`）

