let canvas;
let ctx;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.window = window.innerWidth;
    canvas.height = window.innerHeight;
}