// src/moves.js

import { Chess } from 'chess.js';

// Initialize a new Chess game
export const initializeGame = () => new Chess();

// Handle moves for the chess game
export const makeMove = (game, move) => {
  const moveResult = game.move({
    from: move.sourceSquare,
    to: move.targetSquare,
    promotion: 'q' // Always promote to a queen for simplicity
  });

  return moveResult ? game : null;
};

// Get the current FEN string of the game
export const getFen = (game) => game.fen();
