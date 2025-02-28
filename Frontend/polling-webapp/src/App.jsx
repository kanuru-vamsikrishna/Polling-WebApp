import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/Auth/LoginForm';
import Home from './pages/Dashboard/Home';
import SignUpForm from './pages/Auth/SignUpForm';
import CreatePoll from './pages/Dashboard/CreatePoll';
import VotedPolls from './pages/Dashboard/VotedPolls';
import MyPolls from './pages/Dashboard/MyPolls';
import Bookmarks from './pages/Dashboard/Bookmarks';

// Takes care of the login whether based on localstorage is present or not.
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ): (
    <Navigate to ="/login" />
  )
}

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/sign-up" exact element={<SignUpForm />} />
          <Route path="/create-polls" exact element={<CreatePoll />} />
          <Route path="/voted-polls" exact element={<VotedPolls />} />
          <Route path="/my-polls" exact element={<MyPolls />} />
          <Route path="/bookmarks" exact element={<Bookmarks />} />
        </Routes>
      </Router>
   </div>
  )
}

export default App