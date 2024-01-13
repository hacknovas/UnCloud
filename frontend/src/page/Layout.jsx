import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


const Layout = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>
            {/* <h1 className='bg-orange-600'>hii</h1> */}
        </>
    )
}

export default Layout