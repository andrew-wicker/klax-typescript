import { ADD_GAME_SUCCESSFUL } from '../constants/actionTypes';
import { BoardGame } from '../types/types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface CollectionState {
  games: BoardGame[];
  addedGame: BoardGame | null;
}

// interface AddGameAction {
//   type: typeof ADD_GAME_SUCCESSFUL;
//   payload: BoardGame;
// }

type CollectionActionTypes = PayloadAction<
  BoardGame,
  typeof ADD_GAME_SUCCESSFUL
>;

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
