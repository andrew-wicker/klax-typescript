import * as types from '../constants/actionTypes';
import { DisplayState } from '../types/types';

interface DisplayAction {
  type: string;
}

const initialState: DisplayState = {
  bggId: null,
  title: '',
  coverImage: '',
  thumbnail: '',
  description: '',
  minPlayers: 0,
  maxPlayers: 0,
  yearPublished: 0,
  options: [],
};

const displayReducer = (
  state: DisplayState = initialState,
  action: DisplayAction
): DisplayState => {
  switch (action.type) {
    case types.ADD_GAME_SUCCESSFUL:
      console.log('add game was successful');
      console.log(action.payload),
      games: [...state.games, action.payload],
  };
  default:
    return state;
};

export default displayReducer;
