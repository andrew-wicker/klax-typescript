import React from 'react';
import './SearchResult.css';
import { SearchResultType } from '../../services/types/types';

export const SearchResult: React.FC<SearchResultType> = ({
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
    <div className="search-result-tile">
      <img
        src={boardGameThumbnail}
        alt={`Thumbnail of cover art for board game titled ${boardGameTitle}`}
      />
      <h1>{boardGameTitle}</h1>
      <p>{boardGameYearPublished}</p>
    </div>
  );
};
