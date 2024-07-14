import React from 'react'
import nopage from '../assets/nopage.webp'

function NoPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div>
            <img src={nopage}/>
        </div>
    </div>
  )
}

export default NoPage