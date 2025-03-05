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

    initPieces() {
    this.pieces = pieces;
    this.pieces.forEach(piece => {
        this.grid[piece.position.y][piece.position.x] = piece;
         // Adiciona as peças na matriz
    });
}
}


