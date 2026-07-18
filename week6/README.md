# Week 6 — 會員系統（FastAPI + MySQL）

## 檔案結構

```
week6/
├── README.md
├── requirements.txt
├── .env                 # 本地設定（不上傳）
├── main.py              # FastAPI 路由
├── db.py                # MySQL 連線與查詢
├── templates/
│   ├── index.html       # 首頁（註冊 / 登入）
│   ├── member.html      # 會員頁
│   └── ohoh.html        # 錯誤頁
├── static/
│   ├── styles.css
│   └── member.js        # 留言 fetch
└── screenshots/
```

## 執行方式

```bash
cd week6
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

建立 `.env`：

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=你的密碼
MYSQL_DATABASE=website
SESSION_SECRET=change-me-week6
```

啟動：

```bash
python main.py
# http://127.0.0.1:8000/
```

---

## Task 1：三個頁面

| 頁面 | URL | 說明 |
|------|-----|------|
| 首頁 | `GET /` | 註冊表單 + 登入表單 |
| 會員頁 | `GET /member` | 顯示姓名、登出連結 |
| 錯誤頁 | `GET /ohoh?msg=` | 顯示 query 錯誤訊息 |

---

## Task 2：註冊

`POST /signup`（name / email / password）

- email 已存在 → `/ohoh?msg=重複的電子郵件`
- 成功 → insert `member`，redirect `/`
- 前端擋空值

---

## Task 3：登入

`POST /login`（email / password）

- 成功 → session 記錄 `id` / `name` / `email`，redirect `/member`
- 失敗 → `/ohoh?msg=電子郵件或密碼錯誤`
- 前端擋空值

---

## Task 4：登出與權限

- `/member` 未登入 → redirect `/`
- `GET /logout` → `session.clear()`，redirect `/`

---

## Task 5：留言系統

會員頁用 JS `fetch` 呼叫 API（前後端分離）。

| API | Method | 成功 | 失敗 |
|-----|--------|------|------|
| `/api/message` | GET | `{ "ok": true, "data": [...] }` | `{ "error": true }` |
| `/api/message` | POST | `{ "ok": true }` | `{ "error": true }` |

GET `data` 每筆：`id` / `name` / `content` / `self`  
POST body：`{ "content": "留言內容" }`  
`member_id` 從 session 取得。

---

## Task 6：刪除留言

- 僅 `self === true` 顯示刪除鈕 `x`
- `confirm()` 確認後呼叫 API

| API | Method | 成功 | 失敗 |
|-----|--------|------|------|
| `/api/message/{id}` | DELETE | `{ "ok": true }` | `{ "error": true }` |

後端：`DELETE FROM message WHERE id = ? AND member_id = ?`
