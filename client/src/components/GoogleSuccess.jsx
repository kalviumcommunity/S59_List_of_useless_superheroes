import React from 'react'
import { useNavigate } from 'react-router-dom'
function GoogleSuccess() {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/')
    }, 1000);
  return (
    <div>LOGIN SUCCESS</div>
  )
}

export default GoogleSuccess