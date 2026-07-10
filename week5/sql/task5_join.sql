-- Task 5：SQL JOIN

USE website;

-- 建立 message 表
CREATE TABLE IF NOT EXISTS message (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  member_id INT UNSIGNED NOT NULL,
  content TEXT NOT NULL,
  like_count INT UNSIGNED NOT NULL DEFAULT 0,
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (member_id) REFERENCES member(id)
);

INSERT INTO message (member_id, content, like_count)
SELECT id, 'Hello from test user', 3
FROM member
WHERE email = 'test@test.com'
LIMIT 1;

INSERT INTO message (member_id, content, like_count)
SELECT id, 'Another message', 7
FROM member
WHERE email = 'alice@example.com'
LIMIT 1;

INSERT INTO message (member_id, content, like_count) VALUES
(1, '你好世界', 3),
(2, 'Alice 的隨意留言', 7),
(3, 'James 推薦這首歌', 15),
(4, 'Esther：今天吃什麼', 2);

-- 1. 取得所有留言，並包含發送者 name
SELECT
  message.id,
  message.content,
  message.like_count,
  message.time,
  member.name AS sender_name
FROM message
JOIN member ON message.member_id = member.id;

-- 2. 取得 email = test@test.com 發送者的所有留言（含 name）
SELECT
  message.id,
  message.content,
  message.like_count,
  message.time,
  member.name AS sender_name
FROM message
JOIN member ON message.member_id = member.id
WHERE member.email = 'test@test.com';

-- 3. test@test.com 發送留言的平均 like_count
SELECT AVG(message.like_count) AS avg_like_count
FROM message
JOIN member ON message.member_id = member.id
WHERE member.email = 'test@test.com';

-- 4. 依發送者 email 分組，計算平均 like_count
SELECT
  member.email,
  AVG(message.like_count) AS avg_like_count
FROM message
JOIN member ON message.member_id = member.id
GROUP BY member.email;
