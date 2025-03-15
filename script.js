import { Board } from "./src/assets/js/board_generator.js";
import { Game } from "./src/assets/js/game.js"; // Importa o arquivo game.js

const canvas = document.querySelector("canvas");

const largura = 496;
const altura = 496;

const board = new Board(canvas, largura, altura, 8);
board.draw();

// Cria a instância do jogo
const game = new Game(board);

// Adiciona o evento de clique no canvas
canvas.addEventListener("click", (click) => {
    game.handleClick(click); // Lida com o clique usando o Game
});

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

