import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame } from '../types/types';

interface CollectionState {
  games: BoardGame[];
  addedGame: BoardGame | null;
}

export const addGameSuccessfulAction = createAction<BoardGame>(
  'ADD_GAME_SUCCESSFUL'
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(addGameSuccessfulAction, (state, action) => {
      state.games.push(action.payload);
      state.addedGame = action.payload;
    });
  },
});

export const { addGameSuccessful } = collectionSlice.actions;
export default collectionSlice.reducer;
