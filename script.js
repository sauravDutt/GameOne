let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

const password = document.getElementById('lock');

window.onload = function () {
    canvas = document.getElementById('canvasMain');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0)
}

window.addEventListener('resize', function() {
    cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0)
});

password.addEventListener('click', () => {
    console.log('enter password.');
    password.style.display = 'none';
    document.getElementById('passwordOutter').style.width = "330px";
    document.getElementById('showPass').style.display = 'flex';
});
document.getElementById('passwordGo').addEventListener('click', () => {
    console.log('works');
    document.getElementById('passwordOutter').style.width = "50px";
    document.getElementById('showPass').style.display = 'none';
    password.style.display = 'block';
})
// document.getElementById('passwordOutter').addEventListener('click', () => {
//     document.getElementById('passwordOutter').style.width = "50px"
// });

const mouse = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});
 
class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.lineWidth = 1;
        this.#width = width;
        this.#height = height;
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 13;
        this.gradient;
        this.#gradientOne();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 2;
        this.vr = 0.03;
    }
    #gradientOne() {
      this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
      this.gradient.addColorStop("0.1", "#4800ff");
      this.gradient.addColorStop("0.2", "#4e1ec8");
      this.gradient.addColorStop("0.4", "#5c37ba");
      this.gradient.addColorStop("0.6", "#b3ffff");
      this.gradient.addColorStop("0.8", "#80ff80");
      this.gradient.addColorStop("0.9", "#ffff33");  
    }
    #drawLine(angle, x, y) {
        // let positionX = x;
        // let positionY = y;
        // // applying hypotenuse to find the distance between the mouse pointer and the object(line in this case.)
        // let dx = mouse.x - positionX;
        // let dy = mouse.y - positionY;
        // let distance = dx * dx + dy * dy;
        // if(distance > 500000) distance = 500000
        const length = 50;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke()
    }
    animate(timeStamp) {
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr;
            if(this.radius > 20 || this.radius <-20) this.vr *= -1;

            for(let y = 0; y < this.#height; y+= this.cellSize) {
                for(let x = 0; x < this.#width; x += this.cellSize){
                    const angle = (Math.cos(x*0.01) + Math.sin(y*0.01)) * this.radius;
                    this.#drawLine(angle, x , y);
                }
            }
            
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}