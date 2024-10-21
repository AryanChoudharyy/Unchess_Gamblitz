import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Check, X } from 'lucide-react';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const GameInfo: React.FC = () => {
  const { currentPlayer, winner, resetGame, quitGame, offerDraw, respondToDrawOffer, timer, gameStarted, startGame, drawOffered } = useGame();

  const getWinnerText = () => {
    if (winner === 'resigned') {
      return `${currentPlayer === 'white' ? 'Black' : 'White'} wins by resignation!`;
    }
    if (winner === 'draw') {
      return 'Match drawn by mutual agreement';
    }
    return `${winner!.charAt(0).toUpperCase() + winner!.slice(1)} wins!`;
  };

  return (
    <div className="flex flex-col w-[250px]">
      <div className={`w-[170px] h-[100px] bg-gray-700 rounded-t-lg flex items-center justify-center transition-colors duration-300 ${currentPlayer === 'white' && gameStarted && !winner ? 'bg-green-600' : ''}`}>
        <p className="text-white text-2xl font-semibold">White<br/>{formatTime(timer.white)}</p>
      </div>
      
      <div className="w-full bg-gray-700 p-5 flex flex-col justify-center">
        {!gameStarted && !winner ? (
          <button
            onClick={startGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300"
          >
            Start Game
          </button>
        ) : winner ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Game Over!</h2>
            <p className="text-xl mb-6 text-white">{getWinnerText()}</p>
            <button
              onClick={resetGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300 mb-4"
            >
              Rematch
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition duration-300"
            >
              Quit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Current Player:<br/>{currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={quitGame}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Resign
              </button>
              <button
                onClick={offerDraw}
                className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Offer Draw
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className={`w-[170px] h-[100px] bg-gray-700 rounded-b-lg flex items-center justify-center transition-colors duration-300 ${currentPlayer === 'black' && gameStarted && !winner ? 'bg-green-600' : ''}`}>
        <p className="text-white text-2xl font-semibold">Black<br/>{formatTime(timer.black)}</p>
      </div>

      {drawOffered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Draw Offer</h3>
            <p className="mb-6">Your opponent offers a draw. Do you accept?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => respondToDrawOffer(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Check className="mr-2" /> Yes
              </button>
              <button
                onClick={() => respondToDrawOffer(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <X className="mr-2" /> No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameInfo;