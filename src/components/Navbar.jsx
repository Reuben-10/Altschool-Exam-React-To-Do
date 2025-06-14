import React from 'react'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
    return (
        <nav className="w-[1000px h-[71px] flex gap-1.5 px-3 justify-center">
            <div className='w-[182px] h-[47px] flex py-3 px-3 gap-2'>
                <img
                    src='/assets/quill_todo.svg'
                    alt="Todo List Logo"
                    className="w-[37px] h-[37px]"
                />
                <span className=' text-[24px] font-bold text-[#353644]'>ToDo List</span>
            </div>
            <ModeToggle/>
        </nav>
    )
}

export default Navbar