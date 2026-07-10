-- Task 3：SQL CRUD
-- 先執行 task2_schema.sql，再執行本檔

USE website;

-- 1. 新增一筆 test 資料，再新增 4 筆任意資料
INSERT INTO member (name, email, password)
VALUES ('test', 'test@test.com', 'test');

INSERT INTO member (name, email, password, follower_count) VALUES
('Alice', 'alice@example.com', 'pass1', 10),
('James', 'james@example.com', 'pass2', 25),
('Esther', 'esther@example.com', 'pass3', 5),
('Bob', 'bob@example.com', 'pass4', 0);

-- 2. 取得 member 表所有資料
SELECT * FROM member;

-- 3. 依 time 降冪排序新到舊，取得所有資料
SELECT * FROM member ORDER BY time DESC;

-- 4. 依 time 降冪排序，取第 2~4 筆（共 3 筆） 分頁查詢
SELECT * FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;

-- 5. 取得 email = test@test.com 的資料 精確比對
SELECT * FROM member WHERE email = 'test@test.com';

-- 6. 取得 name 包含 es 的資料 模糊比對
SELECT * FROM member WHERE name LIKE '%es%';

-- 7. email = test@test.com 且 password = test 多條件查詢
SELECT * FROM member
WHERE email = 'test@test.com' AND password = 'test';

-- 8. 將 email = test@test.com 的 name 改為 test2
UPDATE member
SET name = 'test2'
WHERE email = 'test@test.com';
