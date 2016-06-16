function BallObject(elasticity,rad) {
  this.v = { x: 1, y: 20 }; 
  this.m = 10;
  this.p = { x: 40, y: 0}; 
  this.r = rad; 
  this.cr = elasticity; 
}

function draw(obj) {
  ctx.beginPath();
  ctx.arc(obj.p.x, obj.p.y, obj.r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function collide(obj) {
  obj.v.y = (obj.cr * floor.m * -obj.v.y + obj.m * obj.v.y) / (obj.m + floor.m);//resolucion de colision
}

function update(obj, dt) {

  //calculo de colision solo en Y para simplificar codigo
  if ((obj.p.y + obj.r) > c.height) { 
     obj.p.y = c.height - obj.r;
     collide(obj);
  }

  obj.v.y += g * dt;
  obj.p.x += obj.v.x * dt * ppm;
  obj.p.y += obj.v.y * dt * ppm;
}

var d = document,
    br = d.createElement("br"),
    c = d.createElement('canvas'),
    b = d.createElement('button'),
    els = d.createElement('input'),
    rad = d.createElement('input'),
    clr = d.createElement('input'),
    clrl = d.createElement('label'),
    coef = d.createElement('label'),
    radL = d.createElement('label'),
    ctx = c.getContext('2d'),
    fps = 30, 
    ppm = 20, 
    g = 9.8, 
    objs = [],
    floor = {
      v: { x: 0, y: 0 }, 
      m: 5.9722 * Math.pow(10, 24) //Masa de la tierra ja!
    },
    t = new Date().getTime();

b.innerHTML = 'Agregar Pelota:';
b.onclick = function() { objs.push(new BallObject(els.value / 100,rad.value)); };

coef.innerHTML = '- Coef de Rest: <span>0.70</span> -    ';
radL.innerHTML = '- Radio: <span>15</span> -';
els.type = 'range';
els.min = 0;
els.max = 100;
els.step = 1;
els.value = 70;
els.style.display = 'block';
els.onchange = function() { 
  coef.getElementsByTagName('span')[0].innerHTML = (this.value / 100).toFixed(2); 
};

rad.type = 'range';
rad.min = 5;
rad.max = 50;
rad.step = 1;
rad.value = 15;
rad.style.display = 'block';
rad.onchange = function() { 
  radL.getElementsByTagName('span')[0].innerHTML = (this.value); 
};

clr.type = 'checkbox';
clr.checked = false;

clrl.appendChild(clr);
clrl.appendChild(d.createTextNode('Trazado'));

//element.appendChild(br);

c.style.border = 'solid 1px #3369ff';
c.style.borderRadius = '10px';
c.style.display = 'block';
c.width = 400;
c.height = 400;

ctx.fillStyle = 'rgb(100,200,255)';
ctx.strokeStyle = 'rgb(33,69,233)';

d.body.appendChild(c);
d.body.appendChild(els);
d.body.appendChild(rad);
d.body.appendChild(b);
d.body.appendChild(clrl);
d.body.appendChild(br);
d.body.appendChild(coef);
d.body.appendChild(radL);

setInterval(function() {

  var nt = new Date().getTime(),
      dt = (nt - t) / 1000;

  if (!clr.checked) {
    ctx.clearRect(0, 0, c.width, c.height);
  }

  for (var i = 0; i < objs.length; i++) {
    update(objs[i], dt);
    draw(objs[i]);
  }

  t = nt;

}, 1000 / fps);