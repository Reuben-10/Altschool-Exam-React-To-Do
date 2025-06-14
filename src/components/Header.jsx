import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { useTodoStore } from '@/store/useTodoStore'

const Header = () => {
    const { searchTerm, setSearchTerm, showAddModal, setShowAddModal, filter, setFilter } = useTodoStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <header className='flex flex-col md:flex-row justify-center items-center gap-3 p-3 my-2 bg-[#FEFEFB]'>
                <Skeleton className="w-full md:w-[385px] h-[49px] rounded-[49.41px]" />
                <div className='flex flex-wrap gap-2 w-full md:w-auto justify-center'>
                    <Skeleton className="w-[70px] h-[40px] rounded" />
                    <Skeleton className="w-[90px] h-[40px] rounded" />
                    <Skeleton className="w-[110px] h-[40px] rounded" />
                    <Skeleton className="w-[90px] h-[40px] rounded" />
                </div>
            </header>
        )
    }

    return (
        <header className='flex flex-col md:flex-row justify-center items-center gap-3 p-3 my-2'>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <input
                    type="text"
                    placeholder='Search todos...'
                    className='w-full md:w-[385px] h-[45px] px-3 border border-[#A3A3B9] rounded-[49.41px] focus:outline-none focus:shadow-[#FDBF46] shadow-sm'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start'>
                <button
                    className={`all-button z-10 flex-1 min-w-[70px] ${filter === "all" ? "" : "opacity-50"}`}
                    onClick={() => setFilter("all")}
                >
                    all
                </button>
                <button
                    className={`pending-button z-10 flex-1 min-w-[90px] ${filter === "pending" ? "" : "opacity-50"}`}
                    onClick={() => setFilter("pending")}
                >
                    pending
                </button>
                <button
                    className={`completed-button z-10 flex-1 min-w-[110px] ${filter === "completed" ? "" : "opacity-50"}`}
                    onClick={() => setFilter("completed")}
                >
                    completed
                </button>
                <Button className="add-button flex items-center justify-center gap-2 min-w-[90px]" onClick={() => setShowAddModal(true)}>
                    <img src='/assets/plus.svg' alt="add" className="w-4 h-4" />
                    <span className="">add</span>
                </Button>
            </div>
        </header>
    )
}

export default Header
