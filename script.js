  let images = [];
  let evszak = "nyar";
  let idx = 0;

  function makeImg(src) {
    const img = document.createElement('img');
    img.src = src;
    img.draggable = false;
    return img;
  }

  function loadSeason(){
  fetch("nyar.txt")
    .then(res => res.text())
    .then(text => {
      images = text.split("\n").map(u => u.trim()).filter(Boolean);
    });
  render();
  }

  function render() {
    const n = images.length;
    ['slot-left','slot-main','slot-right'].forEach(id => document.getElementById(id).innerHTML = '');
    document.getElementById('slot-left') .appendChild(makeImg(images[(idx - 1 + n) % n]));
    document.getElementById('slot-main') .appendChild(makeImg(images[idx]));
    document.getElementById('slot-right').appendChild(makeImg(images[(idx + 1) % n]));
    document.getElementById('dots').innerHTML = '';
    images.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === idx ? ' active' : '');
      d.onclick = () => { idx = i; render(); };
      document.getElementById('dots').appendChild(d);
    });
  }

  document.getElementById('btn-prev').onclick = () => { idx = (idx - 1 + images.length) % images.length; render(); };
  document.getElementById('btn-next').onclick = () => { idx = (idx + 1) % images.length; render(); };

  let touchStartX = null;
  const stage = document.getElementById('stage');
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? document.getElementById('btn-next').click() : document.getElementById('btn-prev').click();
    touchStartX = null;
  });
  stage.addEventListener('mousedown', e => { touchStartX = e.clientX; });
  stage.addEventListener('mouseup',   e => {
    const dx = e.clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? document.getElementById('btn-next').click() : document.getElementById('btn-prev').click();
    touchStartX = null;
  });
  function switchSeason(season) {
    document.getElementById("btn-" + evszak).classList.remove("active");
    evszak = season;
    document.getElementById("btn-" + evszak).classList.add("active");


  }
  document.getElementById('btn-nyar').onclick = () => {switchSeason("nyar");};
  document.getElementById('btn-osz').onclick = () => {switchSeason("osz");};
  document.getElementById('btn-tel').onclick = () => {switchSeason("tel");};
  document.getElementById('btn-tavasz').onclick = () => {switchSeason("tavasz");};


  loadSeason();
