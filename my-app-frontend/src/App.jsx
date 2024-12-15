import { PlayerProvider } from './pages/Tarab/components/Main/Artist/PlayerContext';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Tarab/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import './App.css';

function App() {
  return(
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          {/* <Route path='*' element={<Nopage />} /> */}
        </Routes>
      </BrowserRouter> 
    </PlayerProvider>
  );
};

export default App;
