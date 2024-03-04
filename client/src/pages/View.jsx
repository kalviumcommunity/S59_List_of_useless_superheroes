import React, { useEffect, useState } from 'react';
import RenderList from './../components/RenderList';

import Loader from './../components/Loader';

function View({stack}) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
// https://serverk.onrender.com/api
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
  

  return (
    <div>
      {loading && <Loader />}
      <RenderList data={heroes} />
    </div>
  );
}

export default View;
