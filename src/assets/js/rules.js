import { Piece } from "./piece.js";

// Definição das regras para cada peça
const rulesRook = [{ type: "slide", directions: [[1, 0], [-1, 0], [0, 1], [0, -1]] }];
const rulesBishop = [{ type: "slide", directions: [[1, 1], [-1, -1], [1, -1], [-1, 1]] }];
const rulesQueen = [...rulesRook, ...rulesBishop]; // Rainha combina as regras de torre e bispo
const rulesKnight = [{ type: "step", moves: [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]] }];
const rulesPawn = [{ type: "pawn" }];
const rulesKing = [{ type: "step", moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }];

// Criando peças com caminhos de imagem automáticos
let torre = new Piece("white", "rook", { x: 0, y: 0 }, rulesRook);
let bispo = new Piece("black", "bishop", { x: 2, y: 2 }, rulesBishop);
let rainha = new Piece("white", "queen", { x: 3, y: 3 }, rulesQueen);
let cavalo = new Piece("black", "knight", { x: 4, y: 4 }, rulesKnight);
let peao = new Piece("white", "pawn", { x: 6, y: 4 }, rulesPawn);
let rei = new Piece("black", "king", { x: 2, y: 7 }, rulesKing);

// Exportando para uso em outros arquivos
export { torre, bispo, rainha, cavalo, peao, rei };
