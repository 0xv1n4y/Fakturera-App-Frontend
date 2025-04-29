import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import Sweaden from '../assets/SE.png';
import England from '../assets/GB.png';
import { Menu } from 'lucide-react';

const TermsNavbar = ({ selectedLanguage, setSelectedLanguage, navItems }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languages = ['sv', 'en'];

  return (
    <div className='w-full px-10 pt-10  xl:px-50 md:px-30 lg:px-30 flex justify-between items-center relative'>
      <img src={Logo} alt='logo' className='hidden xl:block h-8 w-auto' />
      <Menu className=' block xl:hidden text-white cursor-pointer w-8 h-8' onClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <div className='absolute top-full left-10 mt-2 bg-white rounded-sm shadow-md z-20 flex flex-col w-50'>
          {navItems.map((item) => (
            <button key={item} className='text-black hover:bg-gray-100 px-6 py-4 text-left text-md md:text-base'>
              {item}
            </button>
          ))}
        </div>
      )}

      <div className='flex items-center gap-4 md:gap-8'>
        <ul className='hidden xl:flex items-center gap-2 md:gap-10 text-sm md:text-base'>
          {navItems.map((item) => (
            <li key={item} className='cursor-pointer'>{item}</li>
          ))}
        </ul>

        <div className='relative'>
          <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className='flex items-center gap-1 md:gap-2'>
            <span>{selectedLanguage === 'en' ? 'English' : 'Svenska'}</span>
            <img src={selectedLanguage === 'en' ? England : Sweaden} alt='flag' className='h-5 w-8' />
          </button>
          {isLanguageDropdownOpen && (
            <div className='absolute top-full right-0 mt-1 w-30 bg-white rounded-md shadow-md z-10'>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className='w-full flex items-center gap-4 px-3 py-2 text-gray-800 hover:bg-gray-100'
                >
                  {lang === 'en' ? 'English' : 'Svenska'}
                  <img src={lang === 'en' ? England : Sweaden} alt='flag' className='h-5 w-8 rounded-sm' />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsNavbar;
