import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'
// import Items from './itemstop'
import ItemTable from './itemtableview'

export function Itemsview() {
    return (
        <div>
            <Sidebar items={true} />
            <Navbar />
            {/* <Items /> */}
            <ItemTable />

        </div>
    )
}


