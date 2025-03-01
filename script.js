const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const largura = 496;
const altura = 496;
console.log(window.devicePixelRatio);
canvas.width = largura * window.devicePixelRatio;
canvas.height = altura * window.devicePixelRatio;
canvas.style.width = largura + "px";
canvas.style.height = altura + "px";
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

// make a grid with canvas
for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++){
        ctx.fillStyle = ((i+j) % 2 === 0)? "#EBECD0" : "#779556";
        ctx.fillRect(i*largura/8, j*altura/8, canvas.width/8, canvas.height/8);
    }
}


