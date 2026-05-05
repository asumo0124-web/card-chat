function showPage(id, btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.bottomnav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
function openPanel(type){
  const c=document.getElementById('sheet-content');
  if(type==='plus'){
    c.innerHTML=`<h2>新增操作</h2><div class="action-grid">
      <button>發圖片</button><button>表情包</button><button>拍一拍</button>
    </div>`;
  }else if(type==='quick'){
    c.innerHTML=`<h2>快捷設定</h2><div class="setting-list">
      <div>分組篩選 <span>›</span></div>
      <div>節奏 <span>›</span></div>
      <div>外觀 <span>›</span></div>
      <div>統計 <span>›</span></div>
      <div onclick="document.body.classList.toggle('dark')">切換夜間模式 <span>點擊</span></div>
    </div>`;
  }else if(type==='pace'){
    c.innerHTML=`<h2>節奏</h2>
      <p>最短等待：1 秒</p><input class="slider" type="range" min="1" max="120" value="1">
      <p>最長等待：120 秒</p><input class="slider" type="range" min="1" max="120" value="80">
      <p>主動發送間隔：0～3 小時</p><input class="slider" type="range" min="0" max="180" value="60">`;
  }
  document.getElementById('sheet').classList.remove('hidden');
}
function closePanel(){document.getElementById('sheet').classList.add('hidden')}
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}
