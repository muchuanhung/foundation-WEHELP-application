// Week 2 — JavaScript 解答（四題）
// 注意：不可使用第三方套件

function problem1() {
  // 題目 1
  function func1(name){
    // 定義角色位置
    const characters = {
      '悟空': [0, 0],
      '丁滿': [-1, 4],
      '辛巴': [-3, 3],
      '貝吉塔': [-4, -1],
      '特南克斯': [1, -2],
      '弗利沙': [4, -1],
    }

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
  func1("辛巴"); // print 最遠弗利沙；最近丁滿、⾙吉塔
  func1("悟空"); // print 最遠丁滿、弗利沙；最近特南克斯
  func1("弗利沙"); // print 最遠辛巴，最近特南克斯
  func1("特南克斯"); // print 最遠丁滿，最近悟空
  return null;
}

function problem2() {
  // 題目 2
  return null;
}

function problem3() {
  // 題目 3
  return null;
}

function problem4() {
  // 題目 4
  return null;
}

function runAll() {
  const results = [
    { title: "Problem 1", value: problem1() },
    { title: "Problem 2", value: problem2() },
    { title: "Problem 3", value: problem3() },
    { title: "Problem 4", value: problem4() },
  ];

  return results
    .map(({ title, value }) => `${title}: ${JSON.stringify(value)}`)
    .join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { problem1, problem2, problem3, problem4, runAll };
}
