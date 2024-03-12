import React, { useEffect, useState } from 'react';
import RenderList from './../components/RenderList';

import Loader from './../components/Loader';
import Header from './../components/Header'


function View({stack}) {

  document.getElementById('root').style.background = "black";

  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
// https://serverk.onrender.com/api
// http://localhost:5000/api/
  useEffect(() => {
    fetch(`https://serverk.onrender.com/api/${stack.code}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setHeroes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
      {loading ? null : <Header />}
      {loading && <Loader />}
    <div className=''>
      <br />
      <br />
      <RenderList data={heroes} />
    </div>
    </>
  );
}

export default View;
