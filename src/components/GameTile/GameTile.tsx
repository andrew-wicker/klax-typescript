import React from 'react';
import './GameTile.css';
interface GameTileProps {
  title: string;
  coverImage: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
}

const GameTile: React.FC<GameTileProps> = ({
  title,
  coverImage,
  description,
  minPlayers,
  maxPlayers,
  yearPublished,
}) => {
  return (
    <div className="gametile">
      <img
        src={coverImage}
        alt={`Box art for the board game titled ${title}`}
      />
      <div className="gametile-info">
        <h1>{title}</h1>
        <p>
          Players: {minPlayers} to {maxPlayers}
        </p>
        <p>Published: {yearPublished}</p>
        <div className="gametile-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameTile;
