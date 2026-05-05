// ===== 字卡 =====
const cards = [
  "你好",
  "我在",
  "哈哈哈",
  "真的假的",
  "你又來了",
  "我正在觀察你"
];

// ===== 隨機 =====
function randomCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

// ===== 聊天 =====
function addMessage(text, sender = "bot") {
  const box = document.querySelector(".messages");

  const div = document.createElement("div");
  div.className = "msg " + sender;

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

  box.appendChild(div);
}

// ===== 發送 =====
function sendMessage() {
  const input = document.getElementById("inputBox");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "me");
  input.value = "";

  setTimeout(() => {
    addMessage(randomCard(), "bot");
  }, 500);
}

// ===== 頭像 =====
let botAvatar = localStorage.getItem("botAvatar");
let myAvatar = localStorage.getItem("myAvatar");

function loadAvatar() {
  if (botAvatar) {
    document.getElementById("botAvatar").style.backgroundImage = `url(${botAvatar})`;
    document.getElementById("botAvatar").style.backgroundSize = "cover";
  }

  if (myAvatar) {
    document.getElementById("myAvatar").style.backgroundImage = `url(${myAvatar})`;
    document.getElementById("myAvatar").style.backgroundSize = "cover";
  }
}

function setupUpload() {
  const bot = document.getElementById("botAvatar");
  const botInput = document.getElementById("botUpload");

  const me = document.getElementById("myAvatar");
  const meInput = document.getElementById("myUpload");

  bot.onclick = () => botInput.click();
  me.onclick = () => meInput.click();

  botInput.onchange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      botAvatar = reader.result;
      localStorage.setItem("botAvatar", botAvatar);
      loadAvatar();
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  meInput.onchange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      myAvatar = reader.result;
      localStorage.setItem("myAvatar", myAvatar);
      loadAvatar();
    };
    reader.readAsDataURL(e.target.files[0]);
  };
}

// ===== 初始化 =====
window.onload = () => {
  loadAvatar();
  setupUpload();

  document.getElementById("sendBtn").onclick = sendMessage;

  document.getElementById("randomBtn").onclick = () => {
    addMessage(randomCard(), "bot");
  };
};
