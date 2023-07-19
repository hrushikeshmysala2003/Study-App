import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Header from './components/Layout/Header/header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
function App() {
  return <Router>

    <Header />

    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/courses' element={<Courses />} ></Route>
      <Route path='/contact' element={<Contact />} ></Route>
      <Route path='/request' element={<Request />} ></Route>
      <Route path='/about' element={<About />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/register' element={<Register />} ></Route>
      <Route path='/forgetpassword' element={<ForgetPassword />} ></Route>
      <Route path='/resetpassword/:token' element={<ResetPassword />} ></Route>
    </Routes>
    
    <Footer />
  </Router>
}

export default App;
