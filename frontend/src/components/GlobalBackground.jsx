import React from 'react';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fafbff] pointer-events-none">
      {/* Soft gradient background areas */}
      <div className="absolute top-[-10%] left-[-15%] w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
      <div className="absolute top-[5%] right-[-10%] w-[45rem] h-[45rem] bg-gradient-to-bl from-pink-100 to-orange-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-gradient-to-tr from-cyan-100 to-blue-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      
      {/* 3D-like floating orbs (inspired by the provided image) */}
      <div className="absolute top-[15%] left-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-cyan-200 via-blue-300 to-blue-400 shadow-[inset_15px_15px_30px_rgba(255,255,255,0.7),inset_-10px_-10px_20px_rgba(0,0,0,0.1),10px_20px_30px_rgba(0,0,0,0.05)] opacity-80 animate-bounce" style={{ animationDuration: '6s', animationTimingFunction: 'ease-in-out' }}></div>
      
      <div className="absolute top-[8%] right-[25%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-200 via-fuchsia-300 to-purple-400 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.7),inset_-5px_-5px_15px_rgba(0,0,0,0.1),5px_15px_20px_rgba(0,0,0,0.05)] opacity-60 animate-bounce filter blur-[2px]" style={{ animationDuration: '5s', animationDelay: '1s', animationTimingFunction: 'ease-in-out' }}></div>
      
      <div className="absolute bottom-[20%] left-[30%] w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.7),inset_-5px_-5px_15px_rgba(0,0,0,0.1),10px_15px_25px_rgba(0,0,0,0.05)] opacity-50 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s', animationTimingFunction: 'ease-in-out' }}></div>
      
      <div className="absolute bottom-[10%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-indigo-200 via-purple-300 to-indigo-400 shadow-[inset_15px_15px_25px_rgba(255,255,255,0.7),inset_-10px_-10px_20px_rgba(0,0,0,0.1),10px_20px_30px_rgba(0,0,0,0.05)] opacity-70 animate-bounce" style={{ animationDuration: '6.5s', animationDelay: '0.5s', animationTimingFunction: 'ease-in-out' }}></div>
      
      {/* Small blurred accents for depth */}
      <div className="absolute top-[30%] right-[10%] w-16 h-16 bg-blue-300 rounded-full filter blur-[20px] opacity-40 animate-pulse"></div>
      <div className="absolute top-[50%] left-[5%] w-20 h-20 bg-pink-300 rounded-full filter blur-[25px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[40%] right-[25%] w-12 h-12 bg-purple-300 rounded-full filter blur-[15px] opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default GlobalBackground;
