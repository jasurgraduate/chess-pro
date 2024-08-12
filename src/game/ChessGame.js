import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Error from './error';
import GameState from './gameState';
import { playSound } from './sound';
import './ChessGame.css';

// Define the piece theme with custom images
const pieceTheme = {
  w_pawn: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/pawn_w.png"
      alt="White Pawn"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  w_rook: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/rook_w.png"
      alt="White Rook"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  w_knight: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/knight_w.png"
      alt="White Knight"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  w_bishop: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/bishop_w.png"
      alt="White Bishop"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  w_queen: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/queen_w.png"
      alt="White Queen"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  w_king: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/king_w.png"
      alt="White King"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_pawn: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/pawn_b.png"
      alt="Black Pawn"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_rook: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/rook_b.png"
      alt="Black Rook"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_knight: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/knight_b.png"
      alt="Black Knight"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_bishop: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/bishop_b.png"
      alt="Black Bishop"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_queen: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/queen_b.png"
      alt="Black Queen"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
  b_king: ({ isDragging, squareWidth, square }) => (
    <img
      src="/chess-pro/img/king_b.png"
      alt="Black King"
      style={{ width: squareWidth, height: squareWidth }}
    />
  ),
};

const ChessGame = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [error, setError] = useState('');

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) {
        setError('Invalid move');
        playSound('error');
        return false;
      }

      if (move.captured) {
        playSound('capture');
      } else {
        playSound('move');
      }

      if (game.inCheck()) {
        playSound('check');
      }

      setFen(game.fen());
      setError('');
      return true;
    } catch (err) {
      console.error('Error in move:', err);
      setError('Incorrect move');
      playSound('error');
      return false;
    }
  };

  const customDarkSquareStyle = {
    backgroundColor: '#779556',
  };

  const customLightSquareStyle = {
    backgroundColor: '#ebecd0',
  };

  return (
    <div className="chessboard-container">
      <Error message={error} />
      <GameState game={game} />
      <div className="chessboard-wrapper">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          pieceTheme={pieceTheme}
          style={{
            backgroundColor: '#f0d9b5',
            borderRadius: '80px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          customDarkSquareStyle={customDarkSquareStyle}
          customLightSquareStyle={customLightSquareStyle}
        />
      </div>
    </div>
  );
};

export default ChessGame;
