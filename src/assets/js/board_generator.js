import { pieces } from "./rules.js";

export class Board {
    constructor(canvas, width, height,blocks) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.blocks = blocks;
        this.tileSize = width / blocks;
        this.pieces = [];

        this.grid = Array(this.blocks).fill(null).map(() => Array(this.blocks).fill(null));


        // Create canvas context
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.initPieces();
    }
    draw() {
    // make a grid with canvas
    for (let i=0; i<this.blocks; i++) {
        for (let j=0; j<this.blocks; j++){
            this.ctx.fillStyle = ((i+j) % 2 === 0)? "#EBECD0" : "#779556";
            this.ctx.fillRect(
                i*this.width/this.blocks,
                j*this.height/this.blocks,
                this.width/this.blocks,
                this.height/this.blocks);}}
    this.pieces.forEach(piece => piece.draw(this.ctx, this.tileSize));
    }
    drawPossibleMoves(moves) {
        this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; // Cor semi-transparente
    
        moves.forEach(move => {
            this.ctx.beginPath();
            this.ctx.arc(
                (move.x + 0.5) * this.tileSize,  // Centraliza no quadrado
                (move.y + 0.5) * this.tileSize,
                this.tileSize / 4,  // Tamanho do círculo
                0,
                2 * Math.PI
            );
            this.ctx.fill();
        });
    }
      

    initPieces() {
    this.pieces = pieces;
    this.pieces.forEach(piece => {
        this.grid[piece.position.y][piece.position.x] = piece;
         // Adiciona as peças na matriz
    });
}
    movePiece(fromX, fromY, toX, toY) {
        let piece = this.grid[fromY][fromX];
    
        if (!piece) {
            console.error("Nenhuma peça encontrada na posição de origem.");
            return false; 
        }
        let moves = piece.move(this.grid);
        let isValidMove = moves.some(move => move.x === toX && move.y === toY);
    
        if (!isValidMove) {
            console.error("Movimento inválido. Tente novamente.");
            return false; 
        }
        let targetPiece = this.grid[toY][toX];

        if (targetPiece && targetPiece.color !== piece.color) {
            piece.capture(targetPiece, this);
            console.log(`Peça ${targetPiece.type} capturada!`);
        }
        // Mover a peça (só ocorre se o movimento for válido)
        this.grid[fromY][fromX] = null;
        this.grid[toY][toX] = piece;
        piece.position = { x: toX, y: toY };
    
        this.draw(); 
        return true; 
    }
}    

