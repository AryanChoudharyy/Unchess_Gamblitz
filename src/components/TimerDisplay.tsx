import React from 'react';
import { PlayerTimer } from '../lib/types';

interface TimerDisplayProps {
  timer: PlayerTimer;
  currentPlayer: 'white' | 'black';
  initialTime: number;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, currentPlayer, initialTime }) => {
  return (
    <div className="w-64 bg-stone-600 p-4 rounded-lg">
      {['black', 'white'].map((player) => (
        <div
          key={player}
          className={`mb-2 p-2 rounded ${currentPlayer === player ? 'bg-green-500' : 'bg-stone-700'}`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-white font-bold capitalize">{player}</span>
            <span className="text-white text-xl">{formatTime(timer[player as keyof PlayerTimer])}</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(timer[player as keyof PlayerTimer] / initialTime) * 100}%`,
                transition: 'width 1s linear',
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerDisplay;

