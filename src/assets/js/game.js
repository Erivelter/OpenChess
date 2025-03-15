export class Game {
    constructor(board) {
        this.board = board;
        this.selectedPiece = null;
        this.selectedPosition = null;
        this.turn = 1;  
        this.currentPlayer = 'white';
    }
    
    // Função para lidar com o clique no tabuleiro
    handleClick(click) {
        const rect = this.board.canvas.getBoundingClientRect();
        const x = click.clientX - rect.left;
        const y = click.clientY - rect.top;
        const tileX = Math.floor(x / this.board.tileSize);
        const tileY = Math.floor(y / this.board.tileSize);
    
        const clickedPiece = this.board.grid[tileY][tileX];
        if (this.selectedPiece) {
            if (clickedPiece && clickedPiece.color === this.currentPlayer) {
                this.selectPiece(tileX, tileY);
                return;
            }
            this.movePiece(tileX, tileY);
        } else {
            this.selectPiece(tileX, tileY);
        }
    }
    
    // Seleciona a peça no tabuleiro
    selectPiece(tileX, tileY) {
        const piece = this.board.grid[tileY][tileX];
        if (piece) {
            if (piece.color !== this.currentPlayer) {
                console.log("Não é a vez do jogador atual!")
                return;}

            this.board.clearPossibleMoves()
            this.selectedPiece = piece;
            this.selectedPosition = { x: tileX, y: tileY };
            console.log(`Selecionado: ${piece.type} em (${tileX}, ${tileY})`);
            this.board.drawPossibleMoves(piece.move(this.board.grid)); // Mostra os movimentos possíveis
        }
    }

    // Move a peça para a nova posição
    movePiece(toX, toY) {
        if (this.selectedPiece) {
            const { x, y } = this.selectedPosition;
            const moved = this.board.movePiece(x, y, toX, toY);
            if (moved){
            this.selectedPiece = null;
            this.selectedPosition = null;
            this.board.clearPossibleMoves();
            this.toggleTurn();}
        }
    }
    toggleTurn() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(`Agora é a vez das ${this.currentPlayer === 'white' ? 'brancas' : 'pretas'}`);
        this.turn++;
    }
    getCurrentTurn() {
        return this.turn;
    }

}