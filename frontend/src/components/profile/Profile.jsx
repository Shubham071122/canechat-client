import React from 'react'
import img1 from '../../assets/avatarplaceholder.png'

function Profile() {
  return (
    <section>
      <div className='w-full flex flex-col items-center justify-center'>
        <div >
          <img src={img1} alt='profile' className='w-32 h-32 '/>
        </div>
        <div>
            <h3>shbuham</h3>
            <p>Noida</p>
            <p>Email</p>
        </div>
      </div>
    </section>
  )
}

export default Profile