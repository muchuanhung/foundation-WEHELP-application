-- Week 7 Task 1：member 綁定 access token
-- 若尚未加欄位，執行：mysql -u root -p website < sql/add_member_token.sql

USE website;

ALTER TABLE member
  ADD COLUMN token VARCHAR(64) NULL UNIQUE;
