import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Blog from './pages/Blogs';
import About from './pages/About';
import Posts from './pages/Posts';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import Login from './authPage/Login';
import Register from './authPage/Register';
import AuthLayout from './authPage/AuthLayout';
import AuthProvider from './context/auth';
import { Toaster }  from 'react-hot-toast';

function App() {
  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/blog/home" replace />} />

      {/* Blog section */}
      <Route path="/blog" element={<NavBar />}>
        <Route path="home" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="posts/:post_id" element={<Posts />} />
        <Route path="my-posts/:user_id" element={<MyPosts />} />
        <Route path="profile/:user_id" element={<Profile />} />
      </Route>

      {/* Auth section */}
    <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </AuthProvider>
    <Toaster position='top-center'/>
    </>
  );
}

export default App;
