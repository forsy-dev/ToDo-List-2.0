import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-900 text-white flex justify-around text-xl py-3'>
        <span className='font-bold '>iTask</span>
        <ul className='flex gap-x-10'>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
