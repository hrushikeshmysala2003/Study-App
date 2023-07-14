import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Header from './components/Layout/Header/header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
function App() {
  return <Router>

    <Header />

    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/courses' element={<Courses />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
    </Routes>
    
    <Footer />
  </Router>
}

export default App;
