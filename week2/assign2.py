# Week 2 — Python 解答（四題）
# 注意：不可使用第三方套件

# 題目 1
def func1(name):
    # 定義角色位置
    characters = {
        "悟空": [0, 0],
        "丁滿": [-1, 4],
        "辛巴": [-3, 3],
        "貝吉塔": [-4, -1],
        "特南克斯": [1, -2],
        "弗利沙": [4, -1],
    }

    # 取得起點角色位置
    start = characters[name]

    # 輔助函式：判斷哪一側，題目說跨側距離要加 2
    def get_side(pos):
        return 2 * pos[0] + pos[1] > 0

    # 用來儲存計算結果
    distances = []

    # for 迴圈計算角色之間的距離
    for key in characters:
        if key == name:
            continue

        target = characters[key]
        # 計算路徑距離 [-3,3] -> [-4,3] = 1
        route_distance = abs(target[0] - start[0]) + abs(target[1] - start[1])
        # 計算跨側距離
        cross_side = 2 if get_side(start) != get_side(target) else 0
        # 計算總距離
        distance = route_distance + cross_side
        # 儲存計算結果
        distances.append({"name": key, "distance": distance})

    # 找最近、最遠距離
    min_distance = distances[0]["distance"]
    max_distance = distances[0]["distance"]
    for item in distances:
        if item["distance"] < min_distance:
            min_distance = item["distance"]
        if item["distance"] > max_distance:
            max_distance = item["distance"]

    # 找出最近、最遠距離的角色
    closest = []
    farthest = []
    for item in distances:
        if item["distance"] == min_distance:
            closest.append(item["name"])
        if item["distance"] == max_distance:
            farthest.append(item["name"])

    print(f"最遠{'、'.join(farthest)}；最近{'、'.join(closest)}")
func1("辛巴")  # print 最遠弗利沙；最近丁滿、貝吉塔
func1("悟空")  # print 最遠丁滿、弗利沙；最近特南克斯
func1("弗利沙")  # print 最遠辛巴，最近特南克斯
func1("特南克斯")  # print 最遠丁滿，最近悟空

# 題目 2
bookings = {}


def func2(ss, start, end, criteria):
    # 判斷時區overlap
    def has_overlap(start1, end1, start2, end2):
        return start1 < end2 and start2 < end1

    # 檢查這個 service 在指定時間是否還有空
    def is_available(name, start, end):
        if name not in bookings:
            return True
        for booked in bookings[name]:
            if has_overlap(start, end, booked[0], booked[1]):
                return False
        return True

    # 解構 criteria 字串
    def parse_criteria(criteria):
        if ">=" in criteria:
            field, value = criteria.split(">=")
            return {"field": field, "op": ">=", "value": float(value)}
        if "<=" in criteria:
            field, value = criteria.split("<=")
            return {"field": field, "op": "<=", "value": float(value)}
        field, value = criteria.split("=")
        return {"field": field, "op": "=", "value": value}

    # 檢查 service
    def match_criteria(service, field, op, value):
        if field == "name":
            return service["name"] == value
        num = service[field]
        if op == ">=":
            return num >= value
        if op == "<=":
            return num <= value
        return False

    # 比較哪個 service 更符合條件
    def is_better_match(a, b, field, op):
        if field == "name":
            return False
        val_a = a[field]
        val_b = b[field]
        if op == ">=":
            return val_a < val_b
        if op == "<=":
            return val_a > val_b
        return False

    parsed = parse_criteria(criteria)
    field = parsed["field"]
    op = parsed["op"]
    value = parsed["value"]

    best = None

    # 逐一檢查每個 service
    for service in ss:
        # 不符合條件就跳過
        if not match_criteria(service, field, op, value):
            continue

        # 時間被佔用就跳過
        if not is_available(service["name"], start, end):
            continue

        if best is None or is_better_match(service, best, field, op):
            best = service

    if best is None:
        print("Sorry")
        return

    # 預約成功，記錄時間
    if best["name"] not in bookings:
        bookings[best["name"]] = []
    bookings[best["name"]].append([start, end])
    print(best["name"])
services = [
    {"name": "S1", "r": 4.5, "c": 1000},
    {"name": "S2", "r": 3, "c": 1200},
    {"name": "S3", "r": 3.8, "c": 800},
]
func2(services, 15, 17, "c>=800")  # S3
func2(services, 11, 13, "r<=4")  # S3
func2(services, 10, 12, "name=S3")  # Sorry
func2(services, 15, 18, "r>=4.5")  # S1
func2(services, 16, 18, "r>=4")  # Sorry
func2(services, 13, 17, "name=S1")  # Sorry
func2(services, 8, 9, "c<=1500")  # S2

# 題目 3
def func3(index):
    first = 25
    diffs = [-2, -3, 1, 2]

    result = first

    # for 迴圈計算
    for i in range(index):
        result += diffs[i % 4]

    print(result)
func3(1)  # print 23
func3(5)  # print 21
func3(10)  # print 16
func3(30)  # print 6

# 題目 4
def func4(sp, stat, n):
    best_index = -1
    best_space = float("inf")

    # 第一輪：找空位最多，且空位最少
    for i in range(len(sp)):
        if stat[i] != "0":
            continue
        if sp[i] >= n and sp[i] < best_space:
            best_space = sp[i]
            best_index = i

    # 有找到夠裝的車廂，直接印出
    if best_index != -1:
        print(best_index)
        return

    # 第二輪：沒有任何車廂裝得下，改找空位最多的可服務車廂
    best_index = -1
    best_space = -1
    for i in range(len(sp)):
        if stat[i] != "0":
            continue
        if sp[i] > best_space:
            best_space = sp[i]
            best_index = i

    print(best_index)
func4([3, 1, 5, 4, 3, 2], "101000", 2)  # print 5
func4([1, 0, 5, 1, 3], "10100", 4)  # print 4
func4([4, 6, 5, 8], "1000", 4)  # print 2


def run_all():
    return None


if __name__ == "__main__":
    pass
