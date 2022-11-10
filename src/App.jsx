import { Routes, Route } from 'react-router-dom'
import SelectProfile from './pages/SelectProfile'
import Profile from './pages/Profile'
import Error404 from './pages/Error404';

function App() {

  return (
    <Routes>
      <Route path='/'></Route>
      <Route path='/user/' element={<SelectProfile />}></Route>
      <Route path='/user/:id' element={<Profile />}></Route>
      <Route path='*' element={<Error404 />}></Route>
    </Routes>
  );
}

export default App;
