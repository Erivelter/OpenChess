export class Piece{//valid for all types piece except king
    constructor(color, type, position, rules){
        this.color = color;
        this.type = type;
        this.position = position;
        this.rules = rules;
        this.image = new Image();
        this.image.src = this.getImagePath();
    }
    getImagePath() {
        return `resources/${this.color}-${this.type}.svg`;

    }
    draw(ctx, tileSize) {
        this.getImagePath()
        this.image.onload = () => {
            ctx.drawImage(
                this.image,
                this.position.x * tileSize,
                this.position.y * tileSize,
                tileSize,
                tileSize
            );
        };}
    move(grid) {
        let moves = [];
        let { x, y } = this.position;

        for (let rule of this.rules) {
            let nx = x, ny = y;

            if (rule.type === "step") {
                // Movimento fixo (ex: rei, cavalo)
                for (let [dx, dy] of rule.moves) {
                    let newX = x + dx, newY = y + dy;
                    if (this.isValidMove(newX, newY, grid)) {
                        moves.push({ x: newX, y: newY });
                    }
                }
            } else if (rule.type === "slide") {
                // Movimento deslizante (ex: torre, bispo, rainha)
                for (let [dx, dy] of rule.directions) {
                    nx = x, ny = y;
                    while (true) {
                        nx += dx;
                        ny += dy;
                        if (!this.isValidMove(nx, ny, grid)) break;
                        moves.push({ x: nx, y: ny });
                        if (grid[nx][ny]) break; // Para se encontrar uma peça
                    }
                }
            } else if (rule.type === "pawn") {
                // Movimento especial para peões
                let direction = this.color === "branco" ? -1 : 1;
                let startRow = this.color === "branco" ? 6 : 1;

                // Movimento normal
                if (!grid[x + direction][y]) {
                    moves.push({ x: x + direction, y: y });

                    // Movimento duplo no primeiro movimento
                    if (x === startRow && !grid[x + 2 * direction][y]) {
                        moves.push({ x: x + 2 * direction, y: y });
                    }
                }

                // Captura diagonal
                for (let dy of [-1, 1]) {
                    let captureX = x + direction, captureY = y + dy;
                    if (grid[captureX] && grid[captureX][captureY]) {
                        let peca = grid[captureX][captureY];
                        if (peca && peca.color !== this.color) {
                            moves.push({ x: captureX, y: captureY });
                        }
                    }
                }
            }
        }

        return moves;
    }

    isValidMove(x, y, grid) {
        return x >= 0 && x < 8 && y >= 0 && y < 8 &&
            (!grid[x][y] || grid[x][y].color !== this.color);
    }
}
export class King extends Piece {
    constructor(color, position) {
        super(color, "king", position, [
            { type: "step", moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }
        ]);
    }
}