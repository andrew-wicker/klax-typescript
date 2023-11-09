import React from 'react';
import './GameTile.css';
import { BoardGame } from '../../services/types/types';

const GameTile: React.FC<BoardGame> = ({
  boardGameId,
  boardGameTitle,
  boardGameCoverImage,
  boardGameThumbnail,
  boardGameDescription,
  boardGameMinPlayers,
  boardGameMaxPlayers,
  boardGameYearPublished,
}) => {
  return (
    <div className="gametile">
      <img
        src={boardGameCoverImage}
        alt={`Box art for the board game titled ${boardGameTitle}`}
      />
      <div className="gametile-info">
        <h1>{boardGameTitle}</h1>
        <p>
          Players: {boardGameMinPlayers} to {boardGameMaxPlayers}
        </p>
        <p>Published: {boardGameYearPublished}</p>
        <div className="gametile-description">
          <p>{boardGameDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default GameTile;
