import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  clearSearchResults,
  searchGameActionCreator,
} from '../../services/reducers/searchSlice';
import { SearchResult } from '../SearchResult/SearchResult';
import Modal from 'react-modal';
import { BoardGame } from '../../services/types/types';
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const isLoading = useSelector((state: RootState) => state.search.isLoading);
  const titleSelection = useSelector(
    (state: RootState) => state.search.titleSelection
  );
  const dispatch = useAppDispatch();

  const resetSearch = () => {
    setGameTitle('');
    setShowModal(false);
    setCurrentSlide(0);
    dispatch(clearSearchResults());
  };

  const handleAddGame = (index: number) => {
    const game = titleSelection[index];
    dispatch(addGame(game));
    resetSearch();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGameTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (gameTitle.trim() !== '') {
      dispatch(searchGameActionCreator(gameTitle));
      setCurrentSlide(0);
    }
  };

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % titleSelection.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + titleSelection.length) % titleSelection.length
    );
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
          {titleSelection.length > 0 && (
            <SearchResult
              key={titleSelection[currentSlide].boardGameId}
              {...titleSelection[currentSlide]}
            />
          )}
          <button onClick={prevSlide}>Previous</button>
          <button onClick={() => handleAddGame(currentSlide)}>
            Add Game to Collection
          </button>
          <button onClick={nextSlide}>Next</button>
        </div>
        <button onClick={closeModal}>Close</button>
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
