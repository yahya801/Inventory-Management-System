import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

function dashboard() {
    return (
        <div style={{backgroundColor: "red"}}>
            <Sidebar  />
            <Navbar />
        </div>
    )
}

export default dashboard
