import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BoardGame, ErrorInfo } from '../types/types';
// import * as xml2js from 'xml2js';
import { XMLParser } from 'fast-xml-parser';
import { gameDetailLookup } from '../helpers/gameDetailLookup';

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

      const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
        parseAttributeValue: true,
      };
      const parser = new XMLParser(options);
      const jsonData = parser.parse(xmlData);
      const searchResults = jsonData.items.item;
      const selectionIds = searchResults.map((game: any) => game.id);

      const titleSelectionPromises = selectionIds.map(async (id: string) => {
        try {
          return await gameDetailLookup(id);
        } catch (error) {
          console.error('Error in gameDetailLookup:', error);
          return null;
        }
      });
      const titleSelection = await Promise.all(titleSelectionPromises);

      return titleSelection.filter((game) => game !== null);
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
  reducers: {
    clearSearchResults: (state) => {
      state.titleSelection = [];
    },
  },
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

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
