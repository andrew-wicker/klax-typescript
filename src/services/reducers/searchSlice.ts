import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame, ErrorInfo } from '../types/types';
import * as xml2js from 'xml2js';

const createErr = (errInfo: ErrorInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `gameActions.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in gameActions.${method}. Check server logs for more details.`,
    },
  };
};

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

export const searchGameActionCreator = createAsyncThunk(
  'search/searchGame',
  async (gameTitle: string, { rejectWithValue }) => {
    try {
      const requestPath = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

      const response = await fetch(requestPath);

      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }

      const xmlData = await response.text();
      const parser = new xml2js.Parser({
        mergeAttrs: true,
        normalizeTags: true,
        normalize: true,
        explicitArray: false,
      });

      const jsonData = await parser.parseStringPromise(xmlData);
      const searchResults = jsonData.items.item;

      const titleSelection = searchResults.map((game: BoardGame) => ({
        id: game.boardGameId,
        title: game.boardGameTitle,
        yearpublished: game.boardGameYearPublished,
      }));
      return titleSelection;
    } catch (error) {
      const formattedError = createErr({
        method: 'searchGameActionCreator',
        type: 'search',
        err: error,
      });
      return rejectWithValue(formattedError.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchGameActionCreator.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        searchGameActionCreator.fulfilled,
        (state, action: PayloadAction<BoardGame[]>) => {
          state.isLoading = false;
          state.titleSelection = action.payload;
          state.error = null;
        }
      )
      .addCase(searchGameActionCreator.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
