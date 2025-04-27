import { Provider } from 'react-redux';
import { store } from './store';
import styled from 'styled-components';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f7;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Header />
        <Dashboard />
      </AppContainer>
    </Provider>
  );
}

export default App;
