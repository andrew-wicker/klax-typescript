// import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as types from '../constants/actionTypes';
// import bggController from '../../backend/controllers/bggController';
import * as xml2js from 'xml2js';
import { BoardGame, ErrorInfo, SearchResultType } from '../types/types';
import { Dispatch } from 'redux';
// import { parseXml } from '../helpers/parseXml';

interface GameFetchError {
  message: string;
}

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

export const searchGameActionCreator = createAsyncThunk(
  'search/searchGame',
  async (gameTitle, { rejectWithValue }) => {
    try {
      dispatch({ type: types.SEARCH_GAME });

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
      console.log(jsonData);
      const searchResults = jsonData.items.item;
      console.log(searchResults, null, 2);
      // const logthis = JSON.stringify(searchResults, null, 2);
      // console.log(logthis);

      const titleSelection = [];
      searchResults.forEach((game) => {
        const gameObj = {
          id: game.id,
          title: game.name ? game.name.value : 'Unknown',
          yearPublished: game.yearpublished
            ? game.yearpublished.value
            : 'Unknown',
        };
        titleSelection.push(gameObj);
        dispatch(setSearchResultsActionCreator(titleSelection));
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export const setSearchResultsActionCreator = (
  titleSelection: SearchResultType[]
) => ({
  type: types.SET_SEARCH_RESULTS,
  payload: titleSelection,
});

export const gameDetailLookUpActionCreator =
  (gameId: string) => async (dispatch: Dispatch) => {
    try {
      const detailUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`;

      const response = await fetch(detailUrl);
      if (!response.ok) {
        throw new Error(`Network response was not ok on id query`);
      }
      const parser = new xml2js.Parser({
        mergeAttrs: true,
        normalizeTags: true,
        normalize: true,
        explicitArray: false,
      });

      const reqGameData = await response.text();

      const reqGameDataJson = await parser.parseStringPromise(reqGameData);
      console.log(reqGameDataJson);

      const bggId: string = gameId;
      const title: string = reqGameDataJson.items.item.name[0].value;
      const coverImage: string = reqGameDataJson.items.item.image;
      const thumbnail: string = reqGameDataJson.items.item.thumbnail;
      const descriptions: string = reqGameDataJson.items.item.description;
      const minPlayers: string = reqGameDataJson.items.item.minplayers.value;
      const maxPlayers: string = reqGameDataJson.items.item.maxplayers.value;
      const yearPublished: string =
        reqGameDataJson.items.item.yearpublished.value;

      const boardgame: BoardGame = {
        boardGameId: bggId,
        boardGameTitle: title,
        boardGameCoverImage: coverImage,
        boardGameThumbnail: thumbnail,
        boardGameDescription: descriptions,
        boardGameMinPlayers: minPlayers,
        boardGameMaxPlayers: maxPlayers,
        boardGameYearPublished: yearPublished,
      };

      console.log(boardgame);

      dispatch({
        type: types.GAME_DETAIL_LOOKUP,
        payload: gameId,
      });
      dispatch({
        type: types.ADD_GAME_SUCCESSFUL,
        payload: boardgame,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addGameToCollectionActionCreator =
  (boardgame: BoardGame) => async (dispatch: Dispatch) => {
    try {
      const addGameAPI = 'http://localhost:3000/add-game';
      dispatch({ type: types.ADD_GAME_TO_COLLECTION });

      const response = await fetch(addGameAPI, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },

        body: JSON.stringify(boardgame),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }

      dispatch({
        type: types.ADD_GAME_SUCCESSFUL,
        payload: boardgame,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const addGameSuccessfulActionCreator = (boardgame: BoardGame) => {
  return {
    type: types.ADD_GAME_SUCCESSFUL,
    payload: boardgame,
  };
};
