import './App.css';
import { Routes, Route } from 'react-router-dom'
import SelectProfile from './pages/SelectProfile'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/'></Route>
      <Route path='/profile/' element={<SelectProfile />}></Route>
      <Route path='/profile/:id' element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
