import os

import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DATABASE", "website"),
    )


def email_exists(email: str) -> bool:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        # 查詢 email 是否存在 防止 sql injection
        cursor.execute("SELECT id FROM member WHERE email = %s LIMIT 1", (email,))
        return cursor.fetchone() is not None
    finally:
        cursor.close()
        conn.close()

# 註冊會員
def create_member(name: str, email: str, password: str) -> None:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            # 插入會員資料 防止 sql injection
            "INSERT INTO member (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password),
        )
        conn.commit()
    finally:
        cursor.close()
        conn.close()

# 驗證會員
def authenticate_member(email: str, password: str) -> dict | None:
    """回傳 {id, name, email}；帳密不符則 None。"""
    conn = get_connection()
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, name, email FROM member WHERE email = %s AND password = %s LIMIT 1",
            (email, password),
        )
        row = cursor.fetchone()
        return row
    finally:
        cursor.close()
        conn.close()

# 取得留言列表
def list_messages(current_member_id: int) -> list[dict]:
    """回傳留言列表；self 表示是否為目前登入者。"""
    conn = get_connection()
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT
              message.id,
              member.name,
              message.content,
              message.member_id
            FROM message
            JOIN member ON message.member_id = member.id
            ORDER BY message.id ASC
            """
        )
        rows = cursor.fetchall()
        # 將留言列表轉換為API JSON格式
        return [
            {
                "id": row["id"],
                "name": row["name"],
                "content": row["content"],
                # 判斷是否為目前登入者
                "self": row["member_id"] == current_member_id,
            }
            for row in rows
        ]
    finally:
        cursor.close()
        conn.close()


# 新增留言
def create_message(member_id: int, content: str) -> None:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO message (member_id, content) VALUES (%s, %s)",
            (member_id, content),
        )
        # 提交更改 真實寫入
        conn.commit()
    finally:
        cursor.close()
        conn.close()


# 只刪除目前登入會員自己的留言
def delete_message(message_id: int, member_id: int) -> bool:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM message WHERE id = %s AND member_id = %s",
            (message_id, member_id),
        )
        # 判斷是否刪除成功
        deleted = cursor.rowcount == 1
        conn.commit()
        return deleted
    finally:
        cursor.close()
        conn.close()
