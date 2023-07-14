import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Header from './components/Layout/Header/header';
import Courses from './components/Courses/Courses';
function App() {
  return <Router>

    <Header />

    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/courses' element={<Courses />} ></Route>
    </Routes>

  </Router>
}

export default App;
