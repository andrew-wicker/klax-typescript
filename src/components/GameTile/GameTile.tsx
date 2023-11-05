import React from 'react';
import './GameTile.css';
interface GameTileProps {
  title: string;
  coverImage: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: string;
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
      <h1>{title}</h1>
      <p>
        # of Players: {minPlayers} to {maxPlayers} | Published: {yearPublished}
      </p>
      <div className="gametile-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default GameTile;
