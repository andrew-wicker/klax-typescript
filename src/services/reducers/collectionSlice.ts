import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame } from '../types/types';

interface CollectionState {
  games: BoardGame[];
  addedGame: BoardGame | null;
}

const initialState: CollectionState = {
  games: [],
  addedGame: null,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<BoardGame>) => {
      state.games.push(action.payload);
    },
  },
});

export const { addGame } = collectionSlice.actions;
export default collectionSlice.reducer;
