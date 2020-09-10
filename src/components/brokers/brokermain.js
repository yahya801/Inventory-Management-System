import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'
import Brokertable from './brokertable'

function Brokermain() {
    return (
        <div>
            <Sidebar brokers={true} />
            {/* <Navbar /> */}
            <Brokertable />
        </div>
    )
}

export default Brokermain
