import { Piece } from "./piece.js";

// Definição das regras para cada peça
const rulesRook = [{ type: "slide", directions: [[1, 0], [-1, 0], [0, 1], [0, -1]] }];
const rulesBishop = [{ type: "slide", directions: [[1, 1], [-1, -1], [1, -1], [-1, 1]] }];
const rulesQueen = [...rulesRook, ...rulesBishop]; // Rainha combina as regras de torre e bispo
const rulesKnight = [{ type: "step", moves: [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]] }];
const rulesPawn = [{ type: "pawn" }];
const rulesKing = [{ type: "step", moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }];

// Criando peças com caminhos de imagem automáticos
let pieces = [
    // Torres
    new Piece("white", "rook", { x: 0, y: 0 }, rulesRook),
    new Piece("white", "rook", { x: 7, y: 0 }, rulesRook),
    new Piece("black", "rook", { x: 0, y: 7 }, rulesRook),
    new Piece("black", "rook", { x: 7, y: 7 }, rulesRook),

    // Cavalos
    new Piece("white", "knight", { x: 1, y: 0 }, rulesKnight),
    new Piece("white", "knight", { x: 6, y: 0 }, rulesKnight),
    new Piece("black", "knight", { x: 1, y: 7 }, rulesKnight),
    new Piece("black", "knight", { x: 6, y: 7 }, rulesKnight),

    // Bispos
    new Piece("white", "bishop", { x: 2, y: 0 }, rulesBishop),
    new Piece("white", "bishop", { x: 5, y: 0 }, rulesBishop),
    new Piece("black", "bishop", { x: 2, y: 7 }, rulesBishop),
    new Piece("black", "bishop", { x: 5, y: 7 }, rulesBishop),

    // Rainhas
    new Piece("white", "queen", { x: 3, y: 0 }, rulesQueen),
    new Piece("black", "queen", { x: 3, y: 7 }, rulesQueen),

    // Reis
    new Piece("white", "king", { x: 4, y: 0 }, rulesKing),
    new Piece("black", "king", { x: 4, y: 7 }, rulesKing),

    // Peões
    ...Array.from({ length: 8 }, (_, i) => new Piece("white", "pawn", { x: i, y: 1 }, rulesPawn)),
    ...Array.from({ length: 8 }, (_, i) => new Piece("black", "pawn", { x: i, y: 6 }, rulesPawn))
];

// Exportando todas as peças
export { pieces };
