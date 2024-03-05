import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <img src="logo.svg" className='h-14 m-10' alt="" />
    <div className='loader'></div>
    </div>
  )
}

export default Loader