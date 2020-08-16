import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'
import Inventory from './inventorytableview'


export function Inventoryview() {
    return (
        <div>
            <Sidebar inventory={true}/>
            <Navbar />
            <Inventory />
        </div>
    )
}