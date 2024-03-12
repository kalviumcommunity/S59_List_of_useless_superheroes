import React from "react";
import { Link } from "react-router-dom";
import HeroSlider, { Slide, Nav, SideNav,Overlay, MenuNav,  AutoplayButton } from "hero-slider";
import Card from '../components/Card';
import Header from './../components/Header'
import { useEffect, useState } from "react";

const imgArr = [
  'https://images7.alphacoders.com/808/808611.jpg',
  'https://images3.alphacoders.com/666/666317.jpg',
  'https://i.imgur.com/tEvSreU.jpeg',
  'https://i.imgur.com/GmjBjs3.jpeg',
  'https://i.imgur.com/lHyQSdb.jpeg',
  'https://i.imgur.com/KSrsFEz.jpeg',
  'https://i.imgur.com/XrXSVzF.jpeg',
  'https://i.imgur.com/8VWEOH2.jpeg'
]

const Home2 = () => {

  const [login, setLogin] = useState(false);

  useEffect(()=>{
    // const token = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1] || null;
    // const userName = document.cookie.split(';').find(cookie => cookie.includes('userName')).split('=')[1] || null;

    // if(token){
    //   setLogin(true)
    // }
  })

  return (
    <>
    <Header />
    <HeroSlider
    height={"100vh"}
    autoplay
    controller={{
      initialSlide: 1,
      slidingDuration: 500,
      slidingDelay: 100,
      onSliding: (nextSlide) =>
        console.debug("onSliding(nextSlide): ", nextSlide),
      onBeforeSliding: (previousSlide, nextSlide) =>
        console.debug(
          "onBeforeSliding(previousSlide, nextSlide): ",
          previousSlide,
          nextSlide
        ),
      onAfterSliding: (nextSlide) =>
        console.debug("onAfterSliding(nextSlide): ", nextSlide),
    }}
    accessibility = {{
      shouldDisplayButtons : false,
      shouldSlideOnArrowKeypress : true
    }}
    >

    <Overlay>
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-transparent to-black text-white">
          <h1 className="text-6xl w-4/5 text-center font-bold mb-4">Heroic Missteps: Unveiling Superheroes' Least Heroic Moments</h1>
          <h2 className="text-3xl w-4/5 text-center font-medium mb-2">Exploring the Awkward, Useless, and Detrimental Side of Superheroism</h2>
          <p className="text-2xl w-4/5 text-center mt-10">Dive into the extraordinary world of superheroes through 'Hero Rank,' where we shed light on those moments when even the mightiest heroes had their fair share of missteps. From comically useless scenes to unintended consequences, join us on a journey of laughter, reflection, and a fresh perspective on the lighter side of heroism. Because even the most powerful beings have their off days!</p>
        </div>
      </Overlay>

      {imgArr.map((img, index) => {
        return (
          <Slide 
            key={index}
            background={{
              backgroundImageSrc: img,
              backgroundAttachment: "fixed"
            }}
            >
              </Slide>
        )
      })}

      <Nav />
      <SideNav
    isPositionedRight={false}
    position={{
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)'
    }}
  />

  <SideNav />
      {/* <MenuNav /> */}
    </HeroSlider>
    <div className="w-full">
      <h1 className="text-white text-center m-10 font-bold italic text-4xl">Explore Heroic Missteps: Choose Your Universe</h1>
      <div className={`h-full mx-auto  my-10 w-4/5  items-center transition-all duration-1000 flex justify-around`}>
            <Link to={"/marvel"}><Card imageUrl="Marvel.webp" heroText="Marvel Universe" /></Link>
            <Link to={"/comics"}><Card imageUrl="comics.webp" heroText="Comic Characters" /></Link>
            <Link to={"/dc"}><Card imageUrl="dc.jpg" heroText="DC Universe" /></Link>
      </div>
    </div>
  </>
  );
};

export default Home2;
