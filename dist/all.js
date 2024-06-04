const appRootElement = document.getElementById("root");
const canvasElement = document.createElement("canvas");
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
appRootElement.appendChild(canvasElement);
const context2d = canvasElement.getContext("2d");
const maxBouncers = 1024;
var bouncers = new Array();
const timerInterval = 1500;
const timerId = window.setInterval(() => {
    if (!spawn())
        window.clearTimeout(timerId);
}, timerInterval);
window.addEventListener("keypress", spawn);
loop();
class Bouncer {
    x;
    y;
    size;
    dx;
    dy;
    v;
    style;
    constructor() {
        this.size = Math.random() * 60 + 25;
        this.x = Math.random() * (canvasElement.width - this.size);
        this.y = Math.random() * (canvasElement.height - this.size);
        this.dx = this.x < (canvasElement.width / 2) ? 1 : -1;
        this.dy = this.y < (canvasElement.height / 2) ? 1 : -1;
        this.v = Math.random() * 10 + 1;
        this.style = `rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255} / 50%)`;
    }
    isOutOfBoundX() {
        return this.x <= 0
            || this.x + this.size >= canvasElement.width;
    }
    isOutOfBoundsY() {
        return this.y <= 0
            || this.y + this.size >= canvasElement.height;
    }
    draw() {
        context2d.fillStyle = this.style;
        context2d.fillRect(this.x, this.y, this.size, this.size);
        this.x += this.v * this.dx;
        this.y += this.v * this.dy;
        if (this.isOutOfBoundX())
            this.dx *= -1;
        if (this.isOutOfBoundsY())
            this.dy *= -1;
    }
}
function spawn(ev) {
    const isFull = bouncers.length >= maxBouncers;
    if (!isFull)
        bouncers.push(new Bouncer());
    return !isFull;
}
function loop() {
    context2d.clearRect(0, 0, canvasElement.width, canvasElement.height);
    bouncers.forEach((bouncer) => bouncer.draw());
    window.requestAnimationFrame(loop);
}
