import React from 'react';
import './MainContainer.css';
import SearchDisplay from '../SearchDisplay/SearchDisplay';
import GameTileContainer from '../GameTileContainer/GameTileContainer';

const MainContainer: React.FC = () => {
  return (
    <div className="maincontainer">
      <SearchDisplay />
      <GameTileContainer />
    </div>
  );
};

export default MainContainer;
