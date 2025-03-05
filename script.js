import { Board } from "./src/assets/js/board_generator.js";


const canvas = document.querySelector("canvas");

const largura = 496;
const altura = 496;


const board = new Board(canvas, largura, altura,8);
board.draw();

//pega codernadas do click no canvas
canvas.addEventListener("click", click => {
    const rect = canvas.getBoundingClientRect();
    const x = click.clientX - rect.left;
    const y = click.clientY - rect.top;
    console.log(x, y);
    //descobri posição pelo tilesize
    const tileX = Math.floor(x / board.tileSize);
    const tileY = Math.floor(y / board.tileSize);
    console.log(tileX, tileY);
    //pecorre o array grid em busca da peça nessa posição
    let piece = board.grid[tileY][tileX];
    if (piece) {
        console.log(`Existe um(a) ${piece.type} em (${x}, ${y})`);
    } else {
        console.log(`A posição (${x}, ${y}) está vazia.`);
    }
});


