import React, { useState } from 'react';
import Logo from '../assets/ce-logo.png';
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { LiaSpinnerSolid } from "react-icons/lia";

function Login() {
  const [userData, setUserData] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(true);

  const hadleUserdataChange = (e) => {
    setUserData(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center text-black">
      <div className="border-2 w-96  py-12 px-14 rounded-3xl shadow-2xl">
        <div className="w-full flex flex-col items-center">
          <img src={Logo} alt="logo" className="w-20 h-20" />
          <h2 className="font-semibold text-2xl mt-3">Welecome back Buddy!</h2>
        </div>
        <div className="my-7">
          <input
          type='text'
            placeholder="Email or username"
            value={userData}
            onChange={hadleUserdataChange}
            className="w-full px-3 py-3 rounded-xl outline-blue-900 bg-violet-100"
          />
          <div className="mt-4 relative">
            <input
            type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-3 rounded-xl outline-blue-900 bg-violet-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400 text-lg"
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <a href='#' className='text-[12px] text-blue-400 font-thin ml-1'>Forget Password?</a>
        </div>
        <button className="w-full flex flex-row justify-center items-center bg-blue-700 text-white font-medium text-xl py-3 rounded-xl hover:transition-all 300ms ease-in-out hover:bg-blue-600">
          {
            loading ? <LiaSpinnerSolid className="animate-spin text-2xl" />: "SignIn"
          }
        </button>

        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full h-[0.5px] bg-gray-400 my-4"></div>
          <p className="mx-2 text-gray-400 text-sm font-thin">or</p>
          <div className="w-full h-[0.5px] bg-gray-400 my-4"></div>
        </div>
        <p className='w-full flex flex-row  justify-center text-sm text-gray-500'>Don't have an account? <span className='text-gray-700 ml-1'>Sign Up</span></p>
      </div>
    </section>
  );
}

export default Login;
