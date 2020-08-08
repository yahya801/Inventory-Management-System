import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

function dashboard() {
    return (
        <div>
            <Sidebar home={true} />
            <Navbar />
        </div>
    )
}

export default dashboard
