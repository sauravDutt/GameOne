let canvas;
let ctx;

let mapCanvas;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    mapCanvas = document.getElementById('mapCanvas');
    mapCtx = mapCanvas.getContext('2d');
    canvas.window = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx);
}
