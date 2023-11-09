import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame } from '../types/types';
import { searchGameActionCreator } from '../actions/gameActions';

interface SearchState {
  isLoading: boolean;
  titleSelection: BoardGame[];
  error: string | null;
}

const initialState: SearchState = {
  isLoading: false,
  titleSelection: [],
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchGame: (state) => {
      state.isLoading = true;
    },
    setSearchResults: (state, action: PayloadAction<BoardGame[]>) => {
      state.isLoading = false;
      state.titleSelection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGameActionCreator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchGameActionCreator.fulfilled, (state, action) => {
        state.isLoading = false;
        state.titleSelection = action.payload;
      })
      .addCase(searchGameActionCreator.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch games';
      });
  },
});

export const { searchGame, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
