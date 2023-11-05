import React from 'react';

interface CollectionTileProps {
  title: string;
  coverImage: string;
  description: string;
  minPlayers: string;
  maxPlayers: string;
  yearPublished: string;
}

const CollectionTile: React.FC<CollectionTileProps> = ({
  title,
  coverImage,
  description,
  minPlayers,
  maxPlayers,
  yearPublished,
}) => {
  return (
    <div className="collection-tile">
      <img
        src={coverImage}
        alt={`Box art for the board game titled ${title}`}
      />
      <h1>{title}</h1>
      <p>
        # of Players: {minPlayers} to {maxPlayers} | Published: {yearPublished}
      </p>
      <div className="collection-tile-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CollectionTile;
