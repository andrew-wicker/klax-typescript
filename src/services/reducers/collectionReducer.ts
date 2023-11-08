import { ADD_GAME_SUCCESSFUL } from '../constants/actionTypes';
import { Game } from '../types/types';

export interface CollectionState {
  games: Game[];
  addedGame: Game | null;
}

interface AddGameAction {
  type: typeof ADD_GAME_SUCCESSFUL;
  payload: Game;
}

type CollectionActionTypes = AddGameAction;

const initialState: CollectionState = {
  games: [],
  addedGame: null,
};

const collectionReducer = (
  state: CollectionState = initialState,
  action: CollectionActionTypes
): CollectionState => {
  switch (action.type) {
    case ADD_GAME_SUCCESSFUL:
      console.log('add game successful');
      console.log(action.payload);
      return {
        ...state,
        addedGame: action.payload,
        games: [...state.games, action.payload],
      };
    default:
      return state;
  }
};

export default collectionReducer;
