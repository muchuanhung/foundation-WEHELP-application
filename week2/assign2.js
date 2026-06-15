// Week 2 — JavaScript 解答（四題）
// 注意：不可使用第三方套件

function problem1() {
  // 題目 1
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
