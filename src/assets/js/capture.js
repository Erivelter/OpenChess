export function capturePiece(board, fromX, fromY, toX, toY) {
    let piece = board.grid[fromY][fromX];
    let targetPiece = board.grid[toX][toY];

    if (!piece || !targetPiece) return; // Se não houver peça na origem ou destino, sai

    if (piece.color !== targetPiece.color) {
        console.log(`Peça ${targetPiece.type} capturada!`);
        board.pieces = board.pieces.filter(p => p !== targetPiece);
        board.grid[toX][toY] = null; // Remove a peça capturada do tabuleiro
    }
}
