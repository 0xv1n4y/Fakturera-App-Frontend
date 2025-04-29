import { Menu } from 'lucide-react';
import React from 'react';
import Man from "../assets/man.png";
import Flag from '../assets/flag.png'
const Header = ({onMenuClick}) => {
  return (
    <header className="sticky w-full h-[74px] bg-blue-500 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
          {/* Hamburger Icon for mobile and tablet */}
          <Menu className="block xl:hidden w-6 h-6 text-white cursor-pointer" onClick={onMenuClick} />
          {/* Logo text visible on laptop and desktop */}
          <div className="hidden xl:flex items-center gap-4">
            <img src={Man} alt='Image' className="w-10 h-10"/>
            <div className='flex flex-col gap-1'>
                <h3 className='text-md text-white'>John Andre</h3>
                <p className='text-sm text-gray-50 '>Strofjord AS</p>
            </div>
          </div>
        </div>
        <div className='flex gap-4 items-center tex'>
            <h3 className='text-md text-white font-medium '>English</h3>
            <img src={Flag} alt='flag' className='w-13 h-8'/>
        </div>
      </div>
    </header>
  );
};

export default Header;
