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
import NoteFound from './components/Layout/NotFound/NoteFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import Subscribe from './components/Payments/Subscribe';
import Coursepage from './components/CoursePage/Coursepage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
function App() {
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })
  return <Router>

    <Header />

    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/courses' element={<Courses />} ></Route>
      <Route path='/course/:id' element={<Coursepage />} ></Route>
      <Route path='/contact' element={<Contact />} ></Route>
      <Route path='/request' element={<Request />} ></Route>
      <Route path='/about' element={<About />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/profile' element={<Profile />} ></Route>
      <Route path='/changepassword' element={<ChangePassword />} ></Route>
      <Route path='/updateprofile' element={<UpdateProfile />} ></Route>
      <Route path='/register' element={<Register />} ></Route>
      <Route path='/forgetpassword' element={<ForgetPassword />} ></Route>
      <Route path='/resetpassword/:token' element={<ResetPassword />} ></Route>
      <Route path='/subscribe' element={<Subscribe />} ></Route>
      <Route path='*' element={<NoteFound />} ></Route>
      <Route path='/paymentsuccess' element={<PaymentSuccess />} ></Route>
      <Route path='/paymentfail' element={<PaymentFail />} ></Route>
    </Routes>
    
    <Footer />
  </Router>
}

export default App;


// Profile - changePassword profile, updateProfile
// Admin - adminCourses, createCourse, dashboard, users, sidebar