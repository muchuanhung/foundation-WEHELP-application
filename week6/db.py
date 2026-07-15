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
