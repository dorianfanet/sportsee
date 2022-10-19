import './App.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/'></Route>
      <Route path='/profile/:id'></Route>
    </Routes>
  );
}

export default App;
