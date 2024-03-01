import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Banner = () => {
  // const [showVideo, setShowVideo] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const desiredPauseTime = 13; 
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVideoPlaying(false);
    }, desiredPauseTime * 1000); //milisec conversion
    return () => clearTimeout(timeout);
  }, []);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);

   
    if (progress.playedSeconds >= desiredPauseTime) {
      setIsVideoPlaying(false);
    }
  };

  return (
    
      <div
        className={`transition-opacity duration-3000 `}
      >
        <ReactPlayer
          className="mx-auto"
          url="vid.mp4"
          playing={isVideoPlaying}
          loop={false}
          muted={true}
          width="80%"
          height="100%"
          onProgress={handleProgress}
        />
      </div>
  );
};

export default Banner;
