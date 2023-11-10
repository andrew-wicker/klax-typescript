import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchGameActionCreator,
  setSearchResultsActionCreator,
} from '../../services/actions/gameActions';
// import { RootState } from '../../services/reducers/reducers';
import { SearchResult } from '../SearchResult/SearchResult';
import Modal from 'react-modal';
import { BoardGame, SearchResultType } from '../../services/types/types';
import { addGame } from '../../services/reducers/collectionSlice';

interface RootState {
  search: {
    isLoading: boolean;
    titleSelection: BoardGame[];
  };
}

const SearchDisplay: React.FC = () => {
  const [gameTitle, setGameTitle] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const isLoading = useSelector((state: RootState) => state.search.isLoading);
  const titleSelection = useSelector(
    (state: RootState) => state.search.titleSelection
  );
  const dispatch = useDispatch();

  // const handleAddToCollection = (): void => {
  //   dispatch(setSearchResultsActionCreator([]));
  //   setGameTitle('');
  // };

  const handleAddGame = (game: BoardGame) => {
    dispatch(addGame(game));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGameTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (gameTitle.trim() !== '') {
      dispatch(searchGameActionCreator(gameTitle));
    }
  };

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <div className="search-display">
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Search Results"
      >
        <h2>Search Results</h2>
        <div className="search-results">
          {titleSelection.map((game: SearchResultType) => (
            <SearchResult
              key={game.boardGameId}
              boardGameId={game.boardGameId}
              boardGameTitle={game.boardGameTitle}
              boardGameCoverImage={game.boardGameCoverImage}
              boardGameThumbnail={game.boardGameThumbnail}
              boardGameDescription={game.boardGameDescription}
              boardGameMinPlayers={game.boardGameMinPlayers}
              boardGameMaxPlayers={game.boardGameMaxPlayers}
              boardGameYearPublished={game.boardGameYearPublished}
              onAddToCollection={handleAddGame}
            />
          ))}
        </div>
        <button onClick={closeModal}>X</button>
      </Modal>

      {titleSelection && titleSelection.length > 0 ? (
        <div className="search-results">
          <button onClick={openModal}>Show Results</button>
        </div>
      ) : (
        <form
          className="search-display-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            openModal();
          }}
        >
          <div className="enter-game-title">
            <label htmlFor="search">Add a game to your collection</label>
            <input
              id="search"
              type="search"
              placeholder="Game lookup..."
              autoFocus
              required
              value={gameTitle}
              onChange={handleInputChange}
            />
            <button type="submit">
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchDisplay;
