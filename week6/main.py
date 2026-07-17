import os
from urllib.parse import quote

from dotenv import load_dotenv
from fastapi import FastAPI, Form, Query, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware

from db import (
    authenticate_member,
    create_member,
    create_message,
    email_exists,
    list_messages,
)

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


class MessageCreate(BaseModel):
    content: str

# 重定向到 ohoh 頁面
def redirect_ohoh(msg: str) -> RedirectResponse:
    return RedirectResponse(url=f"/ohoh?msg={quote(msg)}", status_code=303)

# 取得 session 中的 member 資料
def get_session_member(request: Request) -> dict | None:
    return request.session.get("member")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    member_data = get_session_member(request)
    if not member_data:
        return RedirectResponse(url="/", status_code=303)

    return templates.TemplateResponse(
        request=request,
        name="member.html",
        context={"name": member_data["name"]},
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


@app.post("/login")
async def login(
    request: Request,
    email: str = Form(""),
    password: str = Form(""),
):
# 清除 email 和 password 的空白
    email = email.strip()
    password = password.strip()

    if not email or not password:
        return redirect_ohoh("請輸入信箱和密碼")

    member_data = authenticate_member(email, password)
    if member_data is None:
        return redirect_ohoh("電子郵件或密碼錯誤")

    # 寫入 user state：id / email / name
    request.session["member"] = {
        "id": member_data["id"],
        "name": member_data["name"],
        "email": member_data["email"],
    }
    return RedirectResponse(url="/member", status_code=303)


@app.get("/logout")
async def logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/", status_code=303)


@app.get("/api/message")
async def api_get_messages(request: Request):
    member_data = get_session_member(request)
    if not member_data:
        return JSONResponse({"error": True})

    # 取得留言列表
    data = list_messages(member_data["id"])
    # 回傳留言列表
    return {"ok": True, "data": data}


@app.post("/api/message")
async def api_create_message(request: Request, body: MessageCreate):
    member_data = get_session_member(request)
    if not member_data:
        return JSONResponse({"error": True})
    # 清除 content 的空白
    content = body.content.strip()
    # 如果 content 為空，回傳錯誤
    if not content:
        return JSONResponse({"error": True})
    # 新增留言
    create_message(member_data["id"], content)
    return {"ok": True}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
