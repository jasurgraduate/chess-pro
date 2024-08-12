import React, { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Error from './error';
import GameState from './gameState';
import { playSound } from './sound';
import './ChessGame.css';

const ChessGame = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [error, setError] = useState('');

  const onDrop = (sourceSquare, targetSquare, piece) => {
    try {
      // Ensure the promotion piece is valid
      const promotionPiece = piece[1] && ['q', 'r', 'b', 'n'].includes(piece[1].toLowerCase()) 
                              ? piece[1].toLowerCase() 
                              : 'q'; // Default to Queen if invalid

      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotionPiece,
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

  const customPieces = useMemo(() => {
    const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
    const pieceComponents = {};
    pieces.forEach(piece => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/chess-pro/img/${piece}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

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
          customPieces={customPieces}
          style={{
            backgroundColor: '#f0d9b5',
            borderRadius: '8px',
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
