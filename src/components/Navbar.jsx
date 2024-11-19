import React,{ useEffect,useMemo,useState } from "react";
import { Link } from "react-router-dom";
// import useTheme from "../hooks/useTheme"; // Import the custom hook

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo,menu,close } from "../assets";

const Navbar = () => {
  const [ active,setActive ] = useState( "" );
  const [ toggle,setToggle ] = useState( false );
  const [ scrolled,setScrolled ] = useState( false );

  // const { isDarkMode,toggleTheme } = useTheme(); // Use the custom hook

  // Track the scroll position and update the active link
  useEffect( () => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled( scrollTop > 100 );
      const sections = navLinks.map( nav => document.getElementById( nav.id ) );
      let currentSection = "";
      sections.forEach( ( section ) => {
        const { top,bottom } = section.getBoundingClientRect();
        if ( top <= 0 && bottom >= 0 ) {
          currentSection = section.id;
        }
      } );
      setActive( ps => currentSection || ps );
    };
    window.addEventListener( "scroll",handleScroll );
    return () => window.removeEventListener( "scroll",handleScroll );
  },[] );

  const navbarLinks = useMemo( () =>
    navLinks.map( ( nav ) => (
      <li
        key={ nav.id }
        className={ `${active === nav.id
          ? "text-black dark:text-white"
          : "text-gray-600 dark:text-gray-400"
          } hover:text-black dark:hover:text-white text-[18px] font-medium cursor-pointer` }
      >
        <a href={ `#${nav.id}` } onClick={ () => setActive( nav.id ) }>
          { nav.title }
        </a>
      </li>
    ) )
    ,[ active ] )

  return (
    <nav
      className={ `${styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-white dark:bg-primary shadow-lg" : "bg-transparent"
        }` }
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={ () => {
            setActive( "" );
            window.scrollTo( 0,0 );
          } }
        >
          <img src={ logo } alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-black dark:text-white text-[18px] font-bold cursor-pointer flex">
            Rajat Karmokar
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          { navbarLinks }
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={ toggle ? close : menu }
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={ () => setToggle( !toggle ) }
          />

          <div
            className={ `${!toggle ? "hidden" : "flex"
              } p-6 bg-white dark:bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-lg` }
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              { navLinks.map( ( nav ) => (
                <li
                  key={ nav.id }
                  className={ `${active === nav.id
                    ? "text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                    } font-medium cursor-pointer text-[16px]` }
                  onClick={ () => {
                    setToggle( !toggle );
                    setActive( nav.id );
                  } }
                >
                  <a href={ `#${nav.id}` }>{ nav.title }</a>
                </li>
              ) ) }
            </ul>
          </div>
        </div>

        {/* Theme Toggle Button */ }
        {/* <button
          onClick={toggleTheme}
          className={`ml-4 p-2 rounded ${isDarkMode ? "bg-gray-300 text-black" : "bg-gray-800 text-white"}`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
