-- Task 2：建立 database 與 member 表
-- 執行方式：mysql -u root -p < sql/task2_schema.sql

-- 1. 建立 database
CREATE DATABASE IF NOT EXISTS website;
-- 2. Use 是切換使用 database
USE website;

-- 3. 建立 member 表
CREATE TABLE IF NOT EXISTS member (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT, -- 自動遞增，不可為空，不可重複
  name VARCHAR(255) NOT NULL, -- 姓名，不可為空
  email VARCHAR(255) NOT NULL, -- 電子郵件，不可為空
  password VARCHAR(255) NOT NULL, -- 密碼，不可為空
  follower_count INT UNSIGNED NOT NULL DEFAULT 0, -- 追蹤者數量，預設為 0
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 建立時間，預設為現在
  PRIMARY KEY (id) -- 主鍵，唯一識別
);
