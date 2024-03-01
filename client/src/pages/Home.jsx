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
        <div className={`absolute ${blurBack && "backdrop-blur-sm"} transition-opacity h-full w-full justify-center items-center z-10 top-1/2 left-1/2 opacity-${showCards ? "100" : "0"} transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2 flex space-x-32`}>
          <Link to={"/marvel"}><Card imageUrl="Marvel.webp" heroText="Marvel Universe" /></Link>
          <Link to={"/comics"}><Card imageUrl="comics.webp" heroText="Comic Characters" /></Link>
          <Link to={"/dc"}><Card imageUrl="dc.jpg" heroText="DC Universe" /></Link>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
