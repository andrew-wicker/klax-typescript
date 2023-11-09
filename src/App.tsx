import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './services/reducers/reducers';
import { Provider } from 'react-redux';
import MainContainer from './components/MainContainer/MainContainer';
import './App.css';

const store = configureStore({ reducer: rootReducers });

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
