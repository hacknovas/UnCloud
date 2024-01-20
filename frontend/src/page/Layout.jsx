import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


const Layout = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>
        </>
    )
}

export default Layout