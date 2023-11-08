import React, { useState, useEffect } from 'react';
import GameTile from '../GameTile/GameTile';
import { useSelector } from 'react-redux';
import { Game } from '../../services/types/types';
import { RootState } from '../../services/reducers/reducers';

const GameTileContainer: React.FC = () => {
  const [Collection, setCollection] = useState<Game[]>([]);
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
      const data: Game[] = await response.json();
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
      {Collection.map((game: Game) => (
        <GameTile
          key={game.id}
          title={game.title}
          description={game.description}
          minPlayers={game.minPlayers}
          maxPlayers={game.maxPlayers}
          yearPublished={game.yearPublished}
          coverImage={game.coverImage}
        />
      ))}
    </div>
  );
};

export default GameTileContainer;
