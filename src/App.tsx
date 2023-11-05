import React from 'react';
import './App.css';
import GameTile from './components/GameTile/GameTile';

interface GameTileInfo {
  title: string;
  coverImage: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: string;
}

const testGame: GameTileInfo = {
  title: 'Everdell',
  coverImage:
    'https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__original/img/HQ1ti16wT9lqja5_h3gUfHUIcVI=/0x0/filters:format(png)/pic3918905.png',
  description: 'Everdell is fun!',
  minPlayers: 1,
  maxPlayers: 4,
  yearPublished: '2018',
};

export default function App() {
  return (
    <div className="App">
      <h1>k-lax</h1>
      <GameTile {...testGame} />
    </div>
  );
}
