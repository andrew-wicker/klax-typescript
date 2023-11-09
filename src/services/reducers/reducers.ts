import { combineReducers } from '@reduxjs/toolkit';
// import displayReducer from './x_displayReducer';
import collectionReducer, { CollectionState } from './collectionReducer';
import searchReducer, { SearchState } from './searchReducer';

export type RootState = {
  // display: DisplayState;
  collection: CollectionState;
  search: SearchState;
};

const rootReducer = combineReducers<RootState>({
  // display: displayReducer,
  collection: collectionReducer,
  search: searchReducer,
});

export default rootReducer;
