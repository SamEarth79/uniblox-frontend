import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className="flex justify-between items-center py-4 px-16 shadow-lg bg-[#FAFAFA]">
            <div className="flex gap-4 items-center">
                <Image 
                    src="https://www.uniblox.io/static/media/Uniblox.6851390702e3650378b97c30afcd230b.svg"
                    width={32} height={32} alt="logo" 
                />
                <h1 className="text-2xl font-extrabold">Uniblox</h1>
            </div>
            <ul className="flex gap-8">
                <li className='p-2 font-light text-lg cursor-pointer hover:-translate-y-1 transition-all'>Products</li>
                <li className='p-2 font-light text-lg cursor-pointer hover:-translate-y-1 transition-all'>Admin</li>
            </ul>
        </div>
    )
}

export default Header
