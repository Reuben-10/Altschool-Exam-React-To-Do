import React from 'react'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
    return (
        <nav className="h-[71px] flex px-3 items-center justify-evenly">
            <div className='h-[47px] flex py-3 px-3 gap-2'>
                <img
                    src='/assets/quill_todo.svg'
                    alt="Todo List Logo"
                    className="w-[37px] h-[37px]"
                />
                <span className=' text-[24px] font-bold text-[#353644] dark:text-[#E5E6FF]'>ToDo List</span>
            </div>
            <div className="mt-3">
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar
