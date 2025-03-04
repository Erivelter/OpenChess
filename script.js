import { Board } from "./src/assets/js/board_generator.js";


const canvas = document.querySelector("canvas");

const largura = 496;
const altura = 496;


const board = new Board(canvas, largura, altura,8);
board.draw();


