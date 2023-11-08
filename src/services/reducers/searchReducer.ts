import { SEARCH_GAME, SET_SEARCH_RESULTS } from '../constants/actionTypes';

export interface SearchState {
  isLoading: boolean;
  titleSelection: string[];
}

interface SearchGameAction {
  type: typeof SEARCH_GAME;
}

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  payload: string[];
}

type SearchActionTypes = SearchGameAction | SetSearchResultsAction;
const initalState: SearchState = {
  isLoading: false,
  titleSelection: [],
};

const searchReducer = (
  state: SearchState = initalState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case 'SEARCH_GAME':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        isLoading: false,
        titleSelection: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
