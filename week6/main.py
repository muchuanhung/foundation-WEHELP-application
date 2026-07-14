import os
from urllib.parse import quote

from dotenv import load_dotenv
from fastapi import FastAPI, Form, Query, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

from db import create_member, email_exists

load_dotenv()

app = FastAPI()

# 設定 session
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "week6-secret-key"),
)

# 設定靜態檔案
app.mount("/static", StaticFiles(directory="static"), name="static")
# 設定模板
templates = Jinja2Templates(directory="templates")


# 重定向到錯誤頁
def redirect_ohoh(msg: str) -> RedirectResponse:
    return RedirectResponse(url=f"/ohoh?msg={quote(msg)}", status_code=303)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    # Task 1：先用 placeholder；Task 3 改從 session 讀 name
    name = request.session.get("member", {}).get("name", "會員")
    return templates.TemplateResponse(
        request=request,
        name="member.html",
        context={"name": name},
    )


@app.get("/ohoh", response_class=HTMLResponse)
async def ohoh(request: Request, msg: str = Query("")):
    return templates.TemplateResponse(
        request=request,
        name="ohoh.html",
        context={"msg": msg},
    )

# 註冊頁
@app.post("/signup")
async def signup(
    name: str = Form(""),
    email: str = Form(""),
    password: str = Form(""),
):
    name = name.strip()
    email = email.strip()
    password = password.strip()

    if not name or not email or not password:
        return redirect_ohoh("請輸入完整註冊資料")

    if email_exists(email):
        return redirect_ohoh("重複的電子郵件")

    create_member(name, email, password)
    return RedirectResponse(url="/", status_code=303)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
