import { useEffect, useState } from 'react';
import { Chess } from 'chess.js'; // Import Chess from chess.js

export const useOnlineGame = (setFen) => {
  const [gameId, setGameId] = useState(null);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const storedGameId = localStorage.getItem('gameId');
    const storedFen = localStorage.getItem('fen');

    if (storedGameId) {
      setGameId(storedGameId);
      if (storedFen) setFen(storedFen);
    }
  }, [setFen]);

  const createGame = () => {
    const newGameId = Date.now().toString(); // Simple unique ID generation
    setGameId(newGameId);
    localStorage.setItem('gameId', newGameId);
    localStorage.setItem('fen', new Chess().fen());
  };

  const joinGame = (id) => {
    setGameId(id);
    localStorage.setItem('gameId', id);
    // Poll for updates
    pollForUpdates(id);
  };

  const pollForUpdates = (id) => {
    const interval = setInterval(() => {
      const storedFen = localStorage.getItem('fen');
      if (storedFen) setFen(storedFen);
    }, 1000);

    return () => clearInterval(interval);
  };

  const updateGame = (newFen) => {
    localStorage.setItem('fen', newFen);
  };

  return { gameId, playerName, setPlayerName, createGame, joinGame, updateGame };
};
