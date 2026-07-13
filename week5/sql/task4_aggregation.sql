-- Task 4：SQL Aggregation Functions

USE website;

-- 1. 計算 member 表有幾筆資料
SELECT COUNT(*) FROM member;

-- 2. 計算所有 follower_count 總和
SELECT SUM(follower_count) FROM member;

-- 3. 計算所有 follower_count 平均
SELECT AVG(follower_count) FROM member;

-- 4. follower_count 降冪排序後，前 2 筆的平均
SELECT AVG(follower_count) AS avg_top_2_follower_count
FROM (
  SELECT follower_count
  FROM member
  ORDER BY follower_count DESC
  LIMIT 2
) AS top_two;
