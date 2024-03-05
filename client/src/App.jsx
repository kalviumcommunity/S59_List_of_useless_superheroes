import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer' 
import View from './pages/View'

// 
import Home2 from './pages/Home2'

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/dc" element={<View stack={{code : 'dc'}} />} />
        <Route path="/marvel" element={<View  stack={{code : 'marvel'}}/>} />
        <Route path="/comics" element={<View  stack={{code : 'comics'}}/>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App