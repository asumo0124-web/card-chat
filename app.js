// 測試字卡
const cards = [
  "你好",
  "在幹嘛",
  "哈哈",
  "是喔",
  "好喔",
  "不錯",
  "我懂",
  "真的假的"
];

// 找按鈕（…）
const btn = document.querySelector(".more-btn");

// 找聊天區
const chat = document.querySelector(".chat");

// 隨機一條
function randomCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

// 點擊事件
btn.addEventListener("click", () => {
  const msg = document.createElement("div");
  msg.className = "msg other";
  msg.innerText = randomCard();

  chat.appendChild(msg);

  // 滾動到底
  chat.scrollTop = chat.scrollHeight;
});
