import './App.css';
import * as React from 'react';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserLandingPage from './Pages/UserLandingPage';
import HabitPageLayout from './Pages/Habits';
import CreateHabit from './Components/CreateHabit';

import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      {/* This should be /:user to render specific user logged in  */}
      <Route path="/user" element={<UserLandingPage/>}/>
      <Route path="/habit" element={<HabitPageLayout/>}/>
      <Route path="/create" element={<CreateHabit/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
