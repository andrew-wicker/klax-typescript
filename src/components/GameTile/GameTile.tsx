import React from 'react';
import './GameTile.css';
import { Card } from 'react-bootstrap';
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
    <Card
      className="bg-image-hover-wrapper"
      // style={{ width: '20vw', aspectRatio: '1' }}
    >
      <Card.Img
        variant="top"
        className="bg-image-hover"
        src={boardGameCoverImage}
        alt={`Box art for the board game titled ${boardGameTitle}`}
      />
      <Card.ImgOverlay>
        <Card.Body>
          <Card.Title>{boardGameTitle}</Card.Title>
          <Card.Subtitle>
            Players: {boardGameMinPlayers} to {boardGameMaxPlayers}
            <br />
            Published: {boardGameYearPublished}
          </Card.Subtitle>
          <Card.Text className="gametile-description">
            {boardGameDescription}
          </Card.Text>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};

export default GameTile;
