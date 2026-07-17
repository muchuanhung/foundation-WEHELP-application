async function loadMessages() {
  const response = await fetch("/api/message");
  const result = await response.json();

  if (!result.ok) {
    return;
  }

  const list = document.getElementById("message-list");
  list.innerHTML = "";

  for (const message of result.data) {
    const item = document.createElement("li");
    item.className = "message-list__item";
    item.dataset.id = message.id;
    item.textContent = `${message.name}：${message.content}`;
    list.appendChild(item);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadMessages();

  document.getElementById("message-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const input = document.getElementById("message-content");
    const content = input.value.trim();
    if (!content) {
      alert("請輸入留言內容");
      return;
    }

    // 新增留言
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();

    if (!result.ok) {
      alert("留言失敗");
      return;
    }

    input.value = "";
    await loadMessages();
  });
});
