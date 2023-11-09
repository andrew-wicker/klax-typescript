import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame } from '../types/types';
import * as types from '../constants/actionTypes';

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
    addGameSuccessful: (state, action: PayloadAction<BoardGame>) => {
      state.games.push(action.payload);
      state.addedGame = action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(types.ADD_GAME_SUCCESSFUL, (state, action) => {
        state.games.push(action.payload);
        state.addedGame = action.payload;
      });
    },
  },
});

export const { addGameSuccessful } = collectionSlice.actions;
export default collectionSlice.reducer;
