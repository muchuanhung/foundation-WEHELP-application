from fastapi import FastAPI, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# Session 預留給 Task 3 / 4；Task 1 先掛上
app.add_middleware(SessionMiddleware, secret_key="week6-secret-key")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
