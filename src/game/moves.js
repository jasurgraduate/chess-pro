import { playSound } from './sound';

// Move handling function
export const handleDrop = (game, setFen, setError) => (sourceSquare, targetSquare, piece) => {
  try {
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

    // Check if the move resulted in a checkmate
    if (game.game_over() && game.in_checkmate()) {
      playSound('checkmate'); // Play the checkmate sound
    } else if (move.promotion) {
      playSound('promote'); // Play the promotion sound
    } else if (move.captured) {
      playSound('capture'); // Play the capture sound
    } else if (game.in_check()) {
      playSound('check'); // Play the check sound
    } else {
      playSound('move'); // Play the move sound
    }

    setFen(game.fen());
    setError('');
    return true;
  } catch (err) {
    console.error('Error in move:', err);
    // Only set the error message and play sound if it's not a promotion error
    if (!err.message.includes('promotion')) {
      setError('Incorrect move');
      playSound('error');
    }
    return false;
  }
};
