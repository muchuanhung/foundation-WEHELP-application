-- Task 2：建立 database 與 member 表
-- 執行方式：mysql -u root -p < sql/task2_schema.sql

CREATE DATABASE IF NOT EXISTS website;
USE website;

CREATE TABLE IF NOT EXISTS member (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  follower_count INT UNSIGNED NOT NULL DEFAULT 0,
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
