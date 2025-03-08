import { Board } from "./src/assets/js/board_generator.js";


const canvas = document.querySelector("canvas");

const largura = 496;
const altura = 496;


const board = new Board(canvas, largura, altura,8);
board.draw();
let selectedPiece = null;
let selectedPosition = null;

//pega codernadas do click no canvas
canvas.addEventListener("click", click => {
   
    const rect = canvas.getBoundingClientRect();
    const x = click.clientX - rect.left;
    const y = click.clientY - rect.top;
    const tileX = Math.floor(x / board.tileSize);
    const tileY = Math.floor(y / board.tileSize);

    if(!selectedPiece){
        let piece = board.grid[tileY][tileX];
        if (piece) {
            selectedPiece = piece;
            selectedPosition = { x: tileX, y: tileY };
            console.log(`Selecionado: ${piece.type} em (${tileX}, ${tileY})`);
            board.drawPossibleMoves(piece.move(board.grid)); // Mostra os movimentos
            
        }
    }else {
        // Segundo clique: Tentar mover a peça
        board.movePiece(selectedPosition.x, selectedPosition.y, tileX, tileY);
        
        // Resetar seleção após a jogada
        selectedPiece = null;
        selectedPosition = null;
    }});



