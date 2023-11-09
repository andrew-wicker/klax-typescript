import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import displayReducer from '../displayReducer';
import collectionSlice from './services/reducers/collectionSlice';
import searchSlice from './services/reducers/searchSlice';

export const store = configureStore({
  reducer: {
    // display: displayReducer,
    collection: collectionSlice,
    search: searchSlice,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
