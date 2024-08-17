import React, { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import Error from './error';
import { Chess } from 'chess.js';
import GameState from './gameState';
import { handleDrop } from './moves';
import { useClickHandling } from './click';
import { useOnlineGame } from './online';  // Import the online game logic
import './ChessGame.css';

const ChessGame = () => {
  const [fen, setFen] = useState(new Chess().fen());
  const [error, setError] = useState('');

  const {
    game,
    onSquareClick,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    optionSquares,
    rightClickedSquares,
    moveTo
  } = useClickHandling(setFen);

  const onDrop = handleDrop(game, setFen, setError);

  // Online game logic
  const {
    gameId,
    playerName,
    setPlayerName,
    createGame,
    joinGame,
    updateGame,
    playerColor,
    opponentOnline,
  } = useOnlineGame(setFen);

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

  const handleCreateGame = () => {
    createGame();
  };

  const handleJoinGame = () => {
    const id = prompt("Enter game ID to join:");
    if (id) joinGame(id);
  };

  return (
    <div className="chessboard-container">
      <Error message={error} />
      <GameState game={game} />
      <div className="player-info">
        <div className="player-names">
          <div className="player">
            <span className={`status-icon ${playerColor === 'white' ? 'green' : opponentOnline ? 'green' : 'red'}`}>
              {playerColor === 'white' ? '●' : opponentOnline ? '●' : '●'}
            </span>
            <span>{playerColor === 'white' ? playerName || 'You' : 'Opponent'}</span>
          </div>
          <div className="player">
            <span className={`status-icon ${playerColor === 'black' ? 'green' : opponentOnline ? 'green' : 'red'}`}>
              {playerColor === 'black' ? '●' : opponentOnline ? '●' : '●'}
            </span>
            <span>{playerColor === 'black' ? playerName || 'You' : 'Opponent'}</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleCreateGame} disabled={gameId !== null}>Create Game</button>
        <button onClick={handleJoinGame} disabled={gameId !== null}>Join Game</button>
      </div>
      <div className="game-id">
        {gameId && <p>Game ID: {gameId}</p>}
      </div>
      <div className="chessboard-wrapper">
        <Chessboard
          position={fen}
          onPieceDrop={(sourceSquare, targetSquare, piece) => {
            const validMove = onDrop(sourceSquare, targetSquare, piece);
            if (validMove) {
              updateGame(game.fen()); // Sync game state online
            }
          }}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onPromotionPieceSelect={onPromotionPieceSelect}
          customPieces={customPieces}
          style={{
            backgroundColor: '#f0d9b5',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          customDarkSquareStyle={customDarkSquareStyle}
          customLightSquareStyle={customLightSquareStyle}
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares
          }}
          promotionToSquare={moveTo}
          showPromotionDialog={showPromotionDialog}
        />
      </div>
    </div>
  );
};

export default ChessGame;
