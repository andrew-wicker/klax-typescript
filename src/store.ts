import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import displayReducer from './services/reducers/x_displayReducer';
import collectionReducer from './services/reducers/collectionReducer';
import searchReducer from './services/reducers/searchReducer';

type RootReducer = {
  display: ReturnType<typeof displayReducer>;
  collection: ReturnType<typeof collectionReducer>;
  search: ReturnType<typeof searchReducer>;
};

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const store = configureStore({
  reducer: {
    display: displayReducer,
    collection: collectionReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ThunkMiddleware as ThunkMiddleware<RootReducer>
    ),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
