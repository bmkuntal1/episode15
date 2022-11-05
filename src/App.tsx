import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/layouts/Navbar';
import { Contact } from './pages/Contact';
import { CreatePost } from './pages/posts/CreatePost';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Posts } from './pages/posts/Posts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/contact" element={<Contact/>}/>          
          <Route path="/posts" element={<Posts/>}/>          
          <Route path="/posts/create" element={<CreatePost/>}/>          
          <Route path="/posts/update/:id" element={<CreatePost/>}/>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
