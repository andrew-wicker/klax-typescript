import React, { useState, useEffect } from 'react';
import GameTile from '../GameTile/GameTile';
import { useDispatch, useSelector } from 'react-redux';
import { BoardGame } from '../../services/types/types';
import { RootState } from '../../services/reducers/reducers';

const GameTileContainer: React.FC = () => {
  const [collection, setCollection] = useState<BoardGame[]>([]);
  const addedGame = useSelector(
    (state: RootState) => state.collection.addedGame
  );

  const fetchCollection = async () => {
    const collectionApi = 'http://localhost:3000/get-collection';
    try {
      const response = await fetch(collectionApi);
      if (!response.ok) {
        throw new Error(
          'fetchCollection in GameTileContainer: network response was not ok!'
        );
      }
      const data: BoardGame[] = await response.json();
      setCollection(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollection();
    console.log('is the useEffect running?');
  }, [addedGame]);

  return (
    <div className="GameTileContainer">
      {collection.map((game: BoardGame) => (
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
