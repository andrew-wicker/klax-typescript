import { configureStore } from 'redux';
import './App.css';
import { Provider } from 'react-redux';
import MainContainer from './components/MainContainer/MainContainer';

const store = configureStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
