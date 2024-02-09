import React, { useState } from 'react'
import {Container, LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from "../../assets/Logo2.png"
import hamburgerIcon from "../../assets/icon-hamburger.svg"
import closeIcon from "../../assets/icon-close.svg"


function Header() {
  const [navOpen, setNavOpen] = useState(false)

  const closeNavbar = () => {
    setNavOpen(false)
  }

  const toggleNavbar = () => {
    setNavOpen(!navOpen)
  }

const authStatus = useSelector((state) => state.auth.status)

const navItems = [
  {
    name:'Home',
    slug: "/",
    active: true
  },
  {
    name: 'Login',
    slug: "/login",
    active: !authStatus,
  }, {
    name: 'Signup',
    slug: "/signup",
    active: !authStatus
  },
  {
    name: 'All Posts',
    slug: "/all-posts",
    active: authStatus
  },
  {
    name: "Add Post",
    slug: "/add-post",
    active: authStatus,
},
]
  return (
    <header className='py-3 md:py-4 shadow sticky top-0 z-50 px-0 md:px-10 bg-[#00040F]/30 bg-clip-border backdrop-blur-sm bg-opacity-20'>
      <Container>
        <nav className='flex justify-between flex-wrap items-center'>
          <div className='mr-4'>
            <Link to='/'>
            <img 
                   src={Logo}
                   className=' bg-gray-500 h-full md:w-24 w-20'
                   />
            </Link>
          </div>

          <div className='md:hidden mr-4'>
            <button onClick={toggleNavbar}><img src={navOpen ? closeIcon : hamburgerIcon} alt="" /></button>
          </div>

          <ul className={`flex ml-auto md:items-center md:flex-row md:flex flex-wrap ${navOpen ? "w-full flex flex-col items-center": "hidden"}`}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
               <NavLink  onClick={closeNavbar} to={item.slug} className={({isActive}) =>`inline-block px-6 py-2 duration-200 hover:bg-blue-100  text-white rounded-2xl  hover:text-black ${isActive ? 'text-black' : 'text-black/70' } `}>
                {item.name}
                </NavLink>
              </li>
            ) : null
            )}
            {authStatus && (
              <li onClick={closeNavbar}>
                <LogoutBtn className={`inline-bock px-6 py-2 duration-200 hover:text-black text-black/70 `}/> 
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header