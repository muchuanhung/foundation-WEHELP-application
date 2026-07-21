from fastmcp import FastMCP
from fastmcp.server.dependencies import get_http_request

from db import create_message, get_member_id_by_token

mcp = FastMCP("Testing Message Website")

# 從 Authorization: Bearer <token> 取出 token。
def _bearer_token() -> str | None:
    """從 Authorization: Bearer <token> 取出 token。"""
    try:
        request = get_http_request()
    except RuntimeError:
        return None

    auth = request.headers.get("authorization") or ""
    scheme, _, value = auth.partition(" ")
    if scheme.lower() != "bearer" or not value.strip():
        return None
    return value.strip()

# 用 Bearer token 辨識會員並新增留言。
@mcp.tool(
    name="Create Message",
    description="Create a new message in Testing Message Website.",
)
def create_message_tool(content: str) -> dict:
    """用 Bearer token 辨識會員並新增留言。"""
    token = _bearer_token()
    if not token:
        return {"error": True}

    member_id = get_member_id_by_token(token)
    if member_id is None:
        return {"error": True}

    text = content.strip()
    if not text:
        return {"error": True}

    create_message(member_id, text)
    return {"ok": True}


# path="/"：掛到 FastAPI 的 /mcp 後，端點為 /mcp/
mcp_app = mcp.http_app(path="/")
