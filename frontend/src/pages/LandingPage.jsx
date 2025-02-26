import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import smsimg from '../assets/sms-icon-16.png';

function LandingPage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  return (
    <div className={theme === 'dark' ? 'bg-[#122644] text-white' : 'bg-[#E3F2FD] text-gray-900'}>
      <Navbar />
      <div className='w-full min-h-screen flex flex-col justify-center items-center text-center p-6'>
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-300" 
            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
            Welcome to Can&#39;e Chat
          </h1>
          <motion.img 
            className="w-24 h-24 md:w-40 md:h-40 drop-shadow-lg"
            src={smsimg} 
            alt="sms icon" 
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
      </div>
      
      <motion.footer 
        className="w-full py-4 text-center border-t border-gray-300 dark:border-gray-700 bg-blue-100 dark:bg-[#112240]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} Can&#39;e Chat. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}

export default LandingPage;