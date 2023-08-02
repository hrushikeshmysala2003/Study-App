import React, {useEffect} from 'react';
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
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/Createcourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import AdminUsers from './components/Admin/AdminUsers/AdminUsers';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from "react-hot-toast";
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from "protected-route-react"
import Loader from './components/Layout/Loader/Loader';
function App() {
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })
  const {isAuthenticated, user, message, error, loading} = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage" })
    }
  }, [dispatch, error, message])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return <Router>

    {loading ? (
      <Loader />
    ):(
      <>
      <Header isAuthenticated={isAuthenticated} user={user}  />

      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/courses' element={<Courses />} ></Route>
        <Route path='/course/:id' element={<Coursepage />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>
        <Route path='/request' element={<Request />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/login' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Login />
              </ProtectedRoute>
        } ></Route>

        <Route path='/profile' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} >
                <Profile user={user} />
              </ProtectedRoute>
        } ></Route>

        <Route path='/changepassword' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/profile">
                <ChangePassword user={user} />
              </ProtectedRoute>
        } ></Route>
        <Route path='/updateprofile' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/profile">
                <UpdateProfile user={user} />
              </ProtectedRoute>
        } ></Route>
        <Route path='/register' element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Register />
          </ProtectedRoute>
        } ></Route>
        <Route path='/forgetpassword' element={<ForgetPassword />} ></Route>
        <Route path='/resetpassword/:token' element={<ResetPassword />} ></Route>
        <Route path='/subscribe' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/profile">
                <Subscribe />
              </ProtectedRoute>
        } ></Route>
        <Route path='*' element={<NoteFound />} ></Route>
        <Route path='/paymentsuccess' element={<PaymentSuccess />} ></Route>
        <Route path='/paymentfail' element={<PaymentFail />} ></Route>

        {/* Admin Routes */}

        <Route path='/admin/dashboard' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} adminRoute={true} >
                <Dashboard />
              </ProtectedRoute>
        } ></Route>
        <Route path='/admin/createcourse' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} adminRoute={true} >
                <CreateCourse />
              </ProtectedRoute>
        } ></Route>
        <Route path='/admin/courses' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} adminRoute={true} >
                <AdminCourses />
              </ProtectedRoute>
        } ></Route>
        <Route path='/admin/users' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"} adminRoute={true} >
                <AdminUsers />
              </ProtectedRoute>
        } ></Route>
      </Routes>

      <Footer />
      <Toaster />
      </>
    )}
  </Router>
}

export default App;


// Profile - changePassword profile, updateProfile
// Admin - adminCourses, createCourse, dashboard, users, sidebar