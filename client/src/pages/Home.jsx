import React, { useState, useEffect } from 'react';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import Features from '../components/Features';
import Banner from '../components/Banner';
// import Footer from '../components/Footer';
import Card from '../components/Card';
import {useNavigate, Link} from 'react-router-dom'

function Home() {
  const [showCards, setShowCards] = useState(false);
  const [blurBack, setBlurBack] = useState(false);

  useEffect(() => {
    // Set a timeout to show the cards after thirteen seconds
    const timeoutShowCards = setTimeout(() => {
      setShowCards(true);
    }, 13000);

    // Set a timeout to enable backdrop blur after fifteen seconds
    const timeoutBlurBack = setTimeout(() => {
      setBlurBack(true);
    }, 13000);

    // Clear the timeouts to prevent memory leaks
    return () => {
      clearTimeout(timeoutShowCards);
      clearTimeout(timeoutBlurBack);
    };
  }, []);

  return (
    <div className="App">
      
      <div className="relative w-full bg-black" style={{ height: 'fit', overflow: 'hidden' }}>
        <Banner />
      </div>
      
    </div>
  );
}

export default Home;
