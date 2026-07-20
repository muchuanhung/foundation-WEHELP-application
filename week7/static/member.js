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

    const text = document.createElement("span");
    text.textContent = `${message.name}：${message.content}`;
    item.appendChild(text);

    if (message.self) {
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "message-list__delete";
      deleteButton.textContent = "x";
      deleteButton.setAttribute("aria-label", "刪除留言");
      deleteButton.addEventListener("click", async function () {
        if (!confirm("確定要刪除這則留言嗎？")) {
          return;
        }

        const response = await fetch(`/api/message/${message.id}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (!result.ok) {
          alert("刪除留言失敗");
          return;
        }

        await loadMessages();
      });
      item.appendChild(deleteButton);
    }

    list.appendChild(item);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadMessages();

  document.getElementById("generate-token").addEventListener("click", async function () {
    const response = await fetch("/api/token", { method: "PUT" });
    const result = await response.json();
    const display = document.getElementById("token-display");

    if (!result.ok) {
      display.textContent = "";
      alert("產生 Token 失敗");
      return;
    }

    display.textContent = result.token;
  });

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
