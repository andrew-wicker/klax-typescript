import React from 'react';
import GameTile from '../GameTile/GameTile';
import { useSelector } from 'react-redux';
import { BoardGame } from '../../services/types/types';
import { RootState } from '../../services/reducers/reducers';

const GameTileContainer: React.FC = () => {
  const games = useSelector((state: RootState) => state.collection.games);

  return (
    <div className="GameTileContainer">
      {games.map((game: BoardGame) => (
        <GameTile
          key={game.boardGameId}
          boardGameId={game.boardGameId}
          boardGameTitle={game.boardGameTitle}
          boardGameThumbnail={game.boardGameThumbnail}
          boardGameDescription={game.boardGameDescription}
          boardGameMinPlayers={game.boardGameMinPlayers}
          boardGameMaxPlayers={game.boardGameMaxPlayers}
          boardGameYearPublished={game.boardGameYearPublished}
          boardGameCoverImage={game.boardGameCoverImage}
        />
      ))}
    </div>
  );
};

export default GameTileContainer;
