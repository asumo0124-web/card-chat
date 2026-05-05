const cards = [
  "你好", "我在", "哈哈哈", "真的假的", "你又來了",
  "我正在觀察你", "這句是隨機抽到的", "別急，我慢慢回"
];

function showPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".bottomnav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function randomCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

function addMessage(text, sender = "bot") {
  const messages = document.querySelector(".messages");
  const div = document.createElement("div");
  div.className = `msg ${sender}`;

  if (sender === "me") {
    div.innerHTML = `
      <div class="bubble me-bubble">${text}</div>
      <div class="mini-avatar me-avatar"></div>
    `;
  } else {
    div.innerHTML = `
      <div class="mini-avatar"></div>
      <div class="bubble bot-bubble">${text}</div>
    `;
  }

  messages.appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
}

function sendMyMessage() {
  const input = document.querySelector(".inputbar input");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "me");
  input.value = "";

  setTimeout(() => {
    addMessage(randomCard(), "bot");
  }, 800);
}

function openPanel(type) {
  const sheet = document.getElementById("sheet");
  const c = document.getElementById("sheet-content");

  if (type === "plus") {
    c.innerHTML = `
      <h2>新增操作</h2>
      <div class="action-grid">
        <button>發圖片</button>
        <button>表情包</button>
        <button>拍一拍</button>
      </div>
    `;
  }

  if (type === "quick") {
    c.innerHTML = `
      <h2>快捷設定</h2>
      <div class="setting-list">
        <div>分組篩選 <span>›</span></div>
        <div>節奏 <span>›</span></div>
        <div>外觀 <span>›</span></div>
        <div>統計 <span>›</span></div>
        <div onclick="document.body.classList.toggle('dark')">切換夜間模式 <span>點擊</span></div>
      </div>
    `;
  }

  if (type === "pace") {
    c.innerHTML = `
      <h2>節奏</h2>
      <p>最短等待：1 秒</p>
      <input class="slider" type="range" min="1" max="120" value="1">
      <p>最長等待：120 秒</p>
      <input class="slider" type="range" min="1" max="120" value="80">
      <p>主動發送間隔：0～3 小時</p>
      <input class="slider" type="range" min="0" max="180" value="60">
    `;
  }

  sheet.classList.remove("hidden");
}

function closePanel() {
  document.getElementById("sheet").classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.querySelector(".inputbar .round-btn");
  const randomBtn = document.querySelector(".round-btn.dark");
  const sendBtn = document.querySelector(".send-btn");
  const input = document.querySelector(".inputbar input");
  const quickBtn = document.querySelector(".icon-btn");

  if (plusBtn) plusBtn.onclick = () => openPanel("plus");
  if (randomBtn) randomBtn.onclick = () => addMessage(randomCard(), "bot");
  if (sendBtn) sendBtn.onclick = sendMyMessage;
  if (quickBtn) quickBtn.onclick = () => openPanel("quick");

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMyMessage();
    });
  }
});
