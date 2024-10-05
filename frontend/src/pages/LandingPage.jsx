import React from 'react';
import Navbar from '../components/Navbar.jsx';
import smsimg from '../assets/sms-icon-16.png';
function LandingPage() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className="flex items-center">
          <h1 className="text-6xl font-bold text-violet-800"
  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Welcome to Can'e Chat{' '}
          </h1>
          <img className="w-40 h-40" src={smsimg} alt="smsicon" />
        </div>
      <div></div>
      </div>
    </div>
  );
}

export default LandingPage;
