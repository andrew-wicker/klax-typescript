import { useDispatch } from 'react-redux';
import * as types from '../constants/actionTypes';
import bggController from '../../backend/controllers/bggController';
import xml2js from 'xml2js';
import { ErrorInfo, SearchResult, BoardGame, ApiGame } from '../../types';
import { Dispatch } from 'redux';
import { parseXml } from '../helpers/parseXml';

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

export const searchGameActionCreator =
  (gameTitle: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.SEARCH_GAME });
      const requestPath: string = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

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
      const searchResults: ApiGame[] = Array.isArray(jsonData.items.item)
        ? jsonData.items.tem
        : [jsonData.items.item];
      console.log(searchResults);

      const titleSelection: SearchResult[] = searchResults.map(
        (searchResult: ApiGame) => {
          return {
            id: searchResult.id,
            title: searchResult.name.value,
            yearpublished: searchResult.yearpublished.value,
          };
        }
      );

      dispatch(setSearchResultsActionCreator(titleSelection));
    } catch (error) {
      return createErr({
        method: 'Game Search',
        type: 'Fetch Error',
        err: error,
      });
    }
  };

export const setSearchResultsActionCreator = (
  titleSelection: SearchResult[]
) => ({
  type: types.SET_SEARCH_RESULTS,
  payload: titleSelection,
});
