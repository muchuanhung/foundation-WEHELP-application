from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# 建立 FastAPI 實例
app = FastAPI()

# 掛載靜態檔案
app.mount("/static", StaticFiles(directory="static"), name="static")

# 設定 Jinja2 模板目錄
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # Task 1：首頁登入表單
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


# Task 2：POST /login 驗證（之後實作）
# Task 3：GET /member、GET /logout + SessionMiddleware（之後實作）


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
