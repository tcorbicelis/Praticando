const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null };

class Particle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z; // profundidade
    this.size = (1 - z) * 4;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.gravity = 0.02;
    this.friction = 0.99;
  }

  update() {
    this.speedY += this.gravity;
    this.speedX *= this.friction;
    this.speedY *= this.friction;

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.8;
  }

  draw() {
    const opacity = 1 - this.z;
    ctx.fillStyle = `rgba(102,252,241,${opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles(amount, x, y) {
  for (let i = 0; i < amount; i++) {
    const z = Math.random(); // profundidade
    particles.push(new Particle(x, y, z));
  }
}

createParticles(120, canvas.width/2, canvas.height/2);

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.strokeStyle = `rgba(69,162,158,${1 - distance/100})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(11,12,16,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();

canvas.addEventListener("click", (e) => {
  createParticles(40, e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  particles.forEach(p => {
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < 100){
      p.speedX += dx * 0.002;
      p.speedY += dy * 0.002;
    }
  });
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});