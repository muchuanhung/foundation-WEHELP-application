from hotel_data import get_hotels_by_id
from typing import Annotated, Optional
from urllib.parse import quote

# 匯入 FastAPI 相關模組
from fastapi import FastAPI, Form, HTTPException, Query, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

# 建立 FastAPI 實例
app = FastAPI()

# app.get("/square/{number}", response_class=HTMLResponse)
# async def square(number: int):
#     return ('result': number * number)

# query string
@app.get("/hello")
async def hello(name: str):
    # f-string
    message = f"Hello, {name}!"
    return message

# 處理路徑 /mutiple?n1=數字&n2=數字
@app.get("/multiple")
async def multiple(n1: int, n2: int):
    n1 = int(n1)
    n2 = int(n2)
    return {'result': n1 * n2}

# 輸入資料驗證
@app.get("/validate")
async def validate(
    name: Annotated[Optional[str], Query(min_length=1)] = None,
    age: Annotated[Optional[int], Query(ge=0, le=100)] = None,
):
    if name is None or age is None:
        raise HTTPException(status_code=400, detail="請提供 name 和 age")

    return f"姓名: {name}, 年齡: {age}"

# Session 管理登入狀態
app.add_middleware(SessionMiddleware, secret_key="week4-secret-key")

# 掛載靜態檔案
app.mount("/static", StaticFiles(directory="static"), name="static")

# 設定 Jinja2 模板目錄
templates = Jinja2Templates(directory="templates")

# 預設正確信箱和密碼
SESSION_KEY = "LOGGED-IN"
CORRECT_EMAIL = "abc@abc.com"
CORRECT_PASSWORD = "abc"


def redirect_ohoh(msg: str) -> RedirectResponse:
    return RedirectResponse(url=f"/ohoh?msg={quote(msg)}", status_code=303)


def is_logged_in(request: Request) -> bool:
    return request.session.get(SESSION_KEY) is True


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # Task 1：首頁登入表單
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={},
    )


@app.post("/login")
async def login(request: Request, email: str = Form(""), password: str = Form("")):
    # Task 2：驗證信箱與密碼
    if not email or not password:
        return redirect_ohoh("請輸入信箱和密碼")

    if email != CORRECT_EMAIL or password != CORRECT_PASSWORD:
        return redirect_ohoh("信箱或密碼輸入錯誤")

    # Task 3：登入成功，記錄 session
    request.session[SESSION_KEY] = True
    return RedirectResponse(url="/member", status_code=303)


@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    # Task 3：未登入強制回首頁
    if not is_logged_in(request):
        return RedirectResponse(url="/", status_code=303)

    return templates.TemplateResponse(
        request=request,
        name="member.html",
        context={},
    )


@app.get("/logout")
async def logout(request: Request):
    # Task 3：登出，清除登入狀態
    request.session[SESSION_KEY] = False
    return RedirectResponse(url="/", status_code=303)


@app.get("/ohoh", response_class=HTMLResponse)
async def ohoh(request: Request, msg: str = ""):
    return templates.TemplateResponse(
        request=request,
        name="ohoh.html",
        context={"msg": msg},
    )


@app.get("/hotel/{hotel_id}", response_class=HTMLResponse)
async def hotel(request: Request, hotel_id: int):
    # Task 4：顯示旅館資訊
    hotels = get_hotels_by_id()
    hotel_info = hotels.get(hotel_id)

    return templates.TemplateResponse(
        request=request,
        name="hotel.html",
        context={
            "found": hotel_info is not None,
            "hotel": hotel_info,
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
