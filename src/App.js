import { Provider } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import FeatureFlag from './components/FeatureFlag/FeatureFlag';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import store from './app/store'
import { Link } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Container component="main" maxWidth="lg">

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Box mr={2}> <Link to="/">Home</Link></Box>
          <Box><Link to="/feature-flag">Feature flag</Link></Box>

        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feature-flag" element={<FeatureFlag />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
