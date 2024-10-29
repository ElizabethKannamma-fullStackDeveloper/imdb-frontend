import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' Component={Register}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/" element={<Navigate replace to='/register'></Navigate>}></Route>

      </Routes>
    </Router>
  );
};

export default App;
