import React from 'react';
import GameTile from '../GameTile/GameTile';
import { useSelector } from 'react-redux';
import { BoardGame } from '../../services/types/types';
import { RootState } from '../../services/reducers/reducers';
import { Row, Col } from 'react-bootstrap';

const GameTileContainer: React.FC = () => {
  const games = useSelector((state: RootState) => state.collection.games);

  return (
    <Row className="GameTileContainer">
      {games.map((game: BoardGame) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={game.boardGameId}
        >
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
        </Col>
      ))}
    </Row>
  );
};

export default GameTileContainer;
