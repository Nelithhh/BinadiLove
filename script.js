const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = random(0.6, 1);
    this.angle = random(0, Math.PI * 2);
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "red";
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
      this.x, this.y,
      this.x - this.size / 2, this.y,
      this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x, this.y + (this.size + topCurveHeight) / 2,
      this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y,
      this.x, this.y,
      this.x, this.y + topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    if (this.y > canvas.height + this.size) {
      this.y = -10;
      this.x = random(0, canvas.width);
    }
    this.draw();
  }
}

function init() {
  hearts = [];
  for (let i = 0; i < 80; i++) {
    hearts.push(new Heart(random(0, canvas.width), random(0, canvas.height), random(10, 30), random(1, 3)));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Add hearts where you click
window.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    hearts.push(new Heart(e.clientX, e.clientY, random(10, 25), random(1, 3)));
  }
});
