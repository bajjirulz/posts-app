import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Profile from './Profile';
import Home from './Home';
import User from './User';
import Post from './Post';


import Login from './Login';
import { AuthProvider } from './AuthContext';
import './Navbar.css';


const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" component={<About/>} />
        <Route path="/contact" component={<Contact/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<User/>} />
        <Route path="/post/:id" element={<Post/>} />

      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;