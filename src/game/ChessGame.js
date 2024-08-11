// src/game/ChessGame.js

import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Error from './error'; // Import Error component
import GameState from './gameState'; // Import GameState component
import { playSound } from './sound'; // Import playSound function
import './ChessGame.css'; // Import CSS for this component

const ChessGame = () => {
  const [game] = useState(new Chess()); // Initialize chess game, no need for setGame
  const [fen, setFen] = useState(game.fen());
  const [error, setError] = useState('');

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for simplicity
      });

      if (move === null) {
        setError('Invalid move');
        playSound('error'); // Play error sound
        return false; // Invalid move
      }

      // Play move sound
      playSound('move');

      // Update the FEN string and clear any existing error
      setFen(game.fen());
      setError('');
      return true;
    } catch (err) {
      // Log the error to the console (optional)
      console.error('Error in move:', err);

      // Set a user-friendly error message
      setError('Incorrect move');
      playSound('error'); // Play error sound
      return false;
    }
  };

  return (
    <div className="chessboard-container">
      <Error message={error} />
      <GameState game={game} /> {/* Add the GameState component */}
      <div className="chessboard-wrapper">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
        />
      </div>
    </div>
  );
};

export default ChessGame;
