// Week 2 — JavaScript 解答（四題）
// 注意：不可使用第三方套件

// 題目 1
function func1(name) {
  // 定義角色位置
  const characters = {
    悟空: [0, 0],
    丁滿: [-1, 4],
    辛巴: [-3, 3],
    貝吉塔: [-4, -1],
    特南克斯: [1, -2],
    弗利沙: [4, -1],
  };

  // 取得起點角色位置
  let start = characters[name];

  // 輔助函式：判斷哪一側，題目說跨側距離要加 2
  const getSide = (pos) => 2 * pos[0] + pos[1] > 0;

  // 用來儲存計算結果
  let distances = [];

  // for 迴圈計算角色之間的距離
  for (let key in characters) {
    if (key === name) continue;

    let target = characters[key];
    // 計算路徑距離 [-3,3] -> [-4,3] = 1
    let routeDistance =
      Math.abs(target[0] - start[0]) + Math.abs(target[1] - start[1]);
    // 計算跨側距離
    let crossSide = getSide(start) !== getSide(target) ? 2 : 0;
    // 計算總距離
    let distance = routeDistance + crossSide;
    // 儲存計算結果
    distances.push({ name: key, distance: distance });
  }

  // 找最近、最遠距離
  let minDistance = distances[0].distance;
  let maxDistance = distances[0].distance;
  for (let i = 0; i < distances.length; i++) {
    if (distances[i].distance < minDistance) {
      minDistance = distances[i].distance;
    }
    if (distances[i].distance > maxDistance) {
      maxDistance = distances[i].distance;
    }
  }

  // 找出最近、最遠距離的角色
  let closest = [];
  let farthest = [];
  for (let i = 0; i < distances.length; i++) {
    if (distances[i].distance === minDistance) {
      closest.push(distances[i].name);
    }
    if (distances[i].distance === maxDistance) {
      farthest.push(distances[i].name);
    }
  }

  console.log(`最遠${farthest.join("、")}；最近${closest.join("、")}`);
}
func1("辛巴"); // print 最遠弗利沙；最近丁滿、貝吉塔
func1("悟空"); // print 最遠丁滿、弗利沙；最近特南克斯
func1("弗利沙"); // print 最遠辛巴，最近特南克斯
func1("特南克斯"); // print 最遠丁滿，最近悟空

// 題目 2
const bookings = {};
function func2(ss, start, end, criteria) {
  // 判斷時區overlap
  function hasOverlap(start1, end1, start2, end2) {
    return start1 < end2 && start2 < end1;
  }

  // 檢查這個 service 在指定時間是否還有空
  function isAvailable(name, start, end) {
    if (!bookings[name]) {
      return true;
    }
    for (let i = 0; i < bookings[name].length; i++) {
      const booked = bookings[name][i];
      if (hasOverlap(start, end, booked[0], booked[1])) {
        return false;
      }
    }
    return true;
  }

  // 解構 criteria 字串
  function parseCriteria(criteria) {
    // c>=800 -> { field: "c", op: ">=", value: 800 }
    // r<=4 -> { field: "r", op: "<=", value: 4 }
    // name=S3 -> { field: "name", op: "=", value: "S3" }
    if (criteria.includes(">=")) {
      const parts = criteria.split(">=");
      return { field: parts[0], op: ">=", value: Number(parts[1]) };
    }
    if (criteria.includes("<=")) {
      const parts = criteria.split("<=");
      return { field: parts[0], op: "<=", value: Number(parts[1]) };
    }
    const parts = criteria.split("=");
    return { field: parts[0], op: "=", value: parts[1] };
  }

  // 檢查 service
  function matchCriteria(service, field, op, value) {
    if (field === "name") {
      return service.name === value;
    }
    const num = service[field];
    if (op === ">=") {
      return num >= value;
    }
    if (op === "<=") {
      return num <= value;
    }
    return false;
  }

  // 比較哪個 service 更符合條件
  function isBetterMatch(a, b, field, op) {
    if (field === "name") {
      return false;
    }
    const valA = a[field];
    const valB = b[field];
    if (op === ">=") {
      return valA < valB;
    }
    if (op === "<=") {
      return valA > valB;
    }
    return false;
  }

  const parsed = parseCriteria(criteria);
  const field = parsed.field;
  const op = parsed.op;
  const value = parsed.value;

  let best = null;

  // 逐一檢查每個 service
  for (let i = 0; i < ss.length; i++) {
    const service = ss[i];

    // 不符合條件就跳過
    if (!matchCriteria(service, field, op, value)) {
      continue;
    }

    // 時間被佔用就跳過
    if (!isAvailable(service.name, start, end)) {
      continue;
    }

    if (best === null || isBetterMatch(service, best, field, op)) {
      best = service;
    }
  }

  if (best === null) {
    console.log("Sorry");
    return;
  }

  // 預約成功，記錄時間
  if (!bookings[best.name]) {
    bookings[best.name] = [];
  }
  bookings[best.name].push([start, end]);
  console.log(best.name);
}
const services = [
  { name: "S1", r: 4.5, c: 1000 },
  { name: "S2", r: 3, c: 1200 },
  { name: "S3", r: 3.8, c: 800 },
];
func2(services, 15, 17, "c>=800"); // S3
func2(services, 11, 13, "r<=4"); // S3
func2(services, 10, 12, "name=S3"); // Sorry
func2(services, 15, 18, "r>=4.5"); // S1
func2(services, 16, 18, "r>=4"); // Sorry
func2(services, 13, 17, "name=S1"); // Sorry
func2(services, 8, 9, "c<=1500"); // S2

// 題目 3
function func3(index) {
  const first = 25;
  const diffs = [-2, -3, 1, 2];

  let result = first;

  // for 迴圈計算
  for (let i = 0; i < index; i++) {
    result += diffs[i % 4];
  }

  console.log(result);
}
func3(1); // print 23
func3(5); // print 21
func3(10); // print 16
func3(30); // print 6

// 題目 4
function func4(sp, stat, n) {
  let bestIndex = -1;
  let bestSpace = Infinity;

  // 第一輪：找空位最多，且空位最少
  for (let i = 0; i < sp.length; i++) {
    if (stat[i] !== "0") {
      continue;
    }
    if (sp[i] >= n && sp[i] < bestSpace) {
      bestSpace = sp[i];
      bestIndex = i;
    }
  }

  // 有找到夠裝的車廂，直接印出
  if (bestIndex !== -1) {
    console.log(bestIndex);
    return;
  }

  // 第二輪：沒有任何車廂裝得下，改找空位最多的可服務車廂
  bestIndex = -1;
  bestSpace = -1;
  for (let i = 0; i < sp.length; i++) {
    if (stat[i] !== "0") {
      continue;
    }
    if (sp[i] > bestSpace) {
      bestSpace = sp[i];
      bestIndex = i;
    }
  }

  console.log(bestIndex);
}
func4([3, 1, 5, 4, 3, 2], "101000", 2); // print 5
func4([1, 0, 5, 1, 3], "10100", 4); // print 4
func4([4, 6, 5, 8], "1000", 4); // print 2

function runAll() {
  return null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { func1, func2, func3, func4, runAll };
}
