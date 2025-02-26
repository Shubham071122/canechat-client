import { Link } from 'react-router-dom';
import Logo from '../assets/ce-logo.png';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const {isAuthenticated} = useAuth();

  return (
    <div className={`top-0 w-full py-2 sm:py-3 bg-white dark:bg-gray-800 sticky z-10 dark:nav-shad-dark nav-shad-light`}>
      <div className="w-11/12 sm:10/12 flex flex-row justify-between items-center mx-auto">
        <Link to="/" className="flex items-center justify-center gap-3">
          <div className="w-8 sm:w-10 h-8 sm:h-10">
            <img src={Logo} alt="logo" />
          </div>
          <h3 className="font-bold text-lg sm:text-2xl text-violet-900 dark:text-violet-300 transition-colors">
            Can&#39;e Chat
          </h3>
        </Link>
        {
          !isAuthenticated && ( 
            <div className="flex items-center gap-6">
              <Link to="/login" className="font-semibold text-sm sm:text-base text-violet-900 dark:text-violet-300 transition-colors hover:bg-[#693ad6] hover:text-white px-3 py-2 rounded-sm">Login</Link>
              <Link to="/register" className="font-semibold text-sm sm:text-base text-violet-900 dark:text-violet-300 transition-colors hover:bg-[#693ad6] hover:text-white px-3 py-2 rounded-sm">Register</Link> 
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Navbar;
