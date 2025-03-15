export class Piece {
    constructor(color, type, position, rules) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.rules = rules;
        this.firstMove = true;
        this.image = new Image();
        this.image.src = this.getImagePath();
    }

    getImagePath() {
        return `resources/${this.color}-${this.type}.svg`;
    }

    draw(ctx, tileSize) {
        if (this.image.complete) {
            ctx.drawImage(
                this.image,
                this.position.x * tileSize,
                this.position.y * tileSize,
                tileSize,
                tileSize
            );
        } else {
            this.image.onload = () => {
                ctx.drawImage(
                    this.image,
                    this.position.x * tileSize,
                    this.position.y * tileSize,
                    tileSize,
                    tileSize
                );
            };
        }
    }

    move(grid) {
        let moves = [];
        let { x, y } = this.position;

        for (let rule of this.rules) {
            let nx = x, ny = y;

            if (rule.type === "step") {
                for (let [dx, dy] of rule.moves) {
                    let newX = x + dx, newY = y + dy;
                    if (this.isValidMove(newX, newY, grid)) {
                        moves.push({ x: newX, y: newY });
                    }
                }
            } else if (rule.type === "slide") {
                for (let [dx, dy] of rule.directions) {
                    nx = x, ny = y;
                    while (true) {
                        nx += dx;
                        ny += dy;
                        if (!this.isValidMove(nx, ny, grid)) break;
                        moves.push({ x: nx, y: ny });
                        if (grid[ny][nx]) break;
                    }
                }
            } else if (rule.type === "pawn") {
                let direction = this.color === "white" ? 1 : -1;
                
                // Movimento normal de 1 casa
                let newX = x, newY = y + direction;
                if (this.isValidMove(newX, newY, grid) && !grid[newY][newX]) {
                    moves.push({ x: newX, y: newY });
                }

                // Movimento inicial de 2 casas
                if (this.firstMove && ((this.color === "white" && y === 1) || (this.color === "black" && y === 6))) { 
                    let newY2 = y + 2 * direction;
                    if (this.isValidMove(newX, newY2, grid) && !grid[newY2][newX] && !grid[newY][newX]) {
                        moves.push({ x: newX, y: newY2 });
                    }   
                }

                // Captura diagonal
                for (let dx of [-1, 1]) {
                    let captureX = x + dx, captureY = y + direction;
                    if (this.isValidMove(captureX, captureY, grid) && grid[captureY]?.[captureX] && grid[captureY][captureX].color !== this.color) {
                        moves.push({ x: captureX, y: captureY });
                    }
                }
            }
        }
        return moves;
    }

    isValidMove(x, y, grid) {
        return x >= 0 && x < 8 && y >= 0 && y < 8 && (!grid[y][x] || grid[y][x].color !== this.color);
    }
    capture(targetPiece,board){
        if (!targetPiece) return
        board.capturedPieces.push(targetPiece);
        console.log(`Capturando ${targetPiece.type} em ${targetPiece.position.x}, ${targetPiece.position.y}`);
        board.grid[targetPiece.position.y][targetPiece.position.x] = null;
        // Remove do array de peças
        board.pieces = board.pieces.filter(p => p !== targetPiece);
        board.displayCapturedPieces();
    }
}
export class King extends Piece {
    constructor(color, position) {
        super(color, "king", position, [
            { type: "step", moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }
        ]);
    }
}
