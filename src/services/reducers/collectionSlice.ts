import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame } from '../types/types';

interface CollectionState {
  games: BoardGame[];
  addedGame: BoardGame | null;
}

const initialState: CollectionState = {
  games: [],
  addedGame: null,
};

// export const addGameSuccessfulAction = createAction<BoardGame>(
//   'ADD_GAME_SUCCESSFUL'
// );

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<BoardGame>) => {
      state.addedGame = action.payload;
      state.games.push(action.payload);
    },
  },
});

export const { addGame } = collectionSlice.actions;
export default collectionSlice.reducer;
