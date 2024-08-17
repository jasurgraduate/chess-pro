import { useState, useEffect } from 'react';

export const useOnlineGame = (setFen) => {
  const [gameId, setGameId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerColor, setPlayerColor] = useState('white'); // Track player's color
  const [opponentOnline, setOpponentOnline] = useState(false); // Track opponent's online status

  useEffect(() => {
    // Setup listeners for online game events here
    // Simulate opponent connection status
    const mockOpponentConnection = () => {
      setTimeout(() => {
        setOpponentOnline(true); // Opponent connects
      }, 3000);
    };
    mockOpponentConnection();
  }, [setFen]);

  const createGame = () => {
    setPlayerColor('white');
    const newGameId = 'generated-game-id'; // Replace with real game ID from backend
    setGameId(newGameId);
  };

  const joinGame = (id) => {
    setPlayerColor('black');
    setGameId(id);
  };

  const updateGame = (fen) => {
    // Sync the game state with the backend
    console.log(`Updating game ${gameId} with FEN: ${fen}`);
  };

  return {
    gameId,
    playerName,
    setPlayerName,
    createGame,
    joinGame,
    updateGame,
    playerColor,
    opponentOnline, // Provide opponent's online status
  };
};
