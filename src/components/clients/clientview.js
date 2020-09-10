import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'
import ClientTable from './clienttable'

export default function Clientview() {
    return (
        <div>
            <Sidebar clients={true}/>
            {/* <Navbar /> */}
            <ClientTable />
        </div>
    )
}


