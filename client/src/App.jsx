import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import View from './pages/View';
import Blog from './pages/Blog';
import Home2 from './pages/Home2';
import Signup from './pages/Signup';
import Login from './pages/Login';
import LogoutPage from './pages/Logout';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header component */}
        {/* <Header /> */}

        {/* Main content area */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home2 />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dc" element={<View stack={{ code: 'dc' }} />} />
            <Route path="/marvel" element={<View stack={{ code: 'marvel' }} />} />
            <Route path="/comics" element={<View stack={{ code: 'comics' }} />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
