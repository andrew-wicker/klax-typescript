import React, { useState, useEffect } from 'react';
import GameTile from '../GameTile/GameTile';
import { useSelector } from 'react-redux';

interface Game {
  id: string;
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
  coverImage: string;
}

const CollectionDisplay: React.FC = () => {
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
          'fetchCollection in CollectionDisplay: network response was not ok!'
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
    <div className="collectionDisplay">
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

export default CollectionDisplay;
