import { Provider } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import FeatureFlag from './components/FeatureFlag/FeatureFlag';
import Container from '@mui/material/Container';
import store from './app/store'
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Provider store={store}>
      <Container component="main" maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feature-flag" element={<FeatureFlag />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
