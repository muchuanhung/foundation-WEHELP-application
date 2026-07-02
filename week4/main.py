from urllib.parse import quote

# 匯入 FastAPI 相關模組
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# 建立 FastAPI 實例
app = FastAPI()

# 掛載靜態檔案
app.mount("/static", StaticFiles(directory="static"), name="static")

# 設定 Jinja2 模板目錄
templates = Jinja2Templates(directory="templates")

# m預設正確信箱和密碼
CORRECT_EMAIL = "abc@abc.com"
CORRECT_PASSWORD = "abc"


def redirect_ohoh(msg: str) -> RedirectResponse:
    return RedirectResponse(url=f"/ohoh?msg={quote(msg)}", status_code=303)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # Task 1：首頁登入表單
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


@app.post("/login")
async def login(email: str = Form(""), password: str = Form("")):
    # Task 2：驗證信箱與密碼
    if not email or not password:
        return redirect_ohoh("請輸入信箱和密碼")

    if email != CORRECT_EMAIL or password != CORRECT_PASSWORD:
        return redirect_ohoh("信箱或密碼輸入錯誤")

    return RedirectResponse(url="/member", status_code=303)


@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    # Task 2：成功頁（Task 3 再加上 session 檢查）
    return templates.TemplateResponse(
        request=request,
        name="member.html",
        context={},
    )


@app.get("/ohoh", response_class=HTMLResponse)
async def ohoh(request: Request, msg: str = ""):
    return templates.TemplateResponse(
        request=request,
        name="ohoh.html",
        context={"msg": msg},
    )


# Task 3：GET /logout + SessionMiddleware（之後實作）


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
