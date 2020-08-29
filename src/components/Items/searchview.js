import React from 'react'
import Sidebar from '../sidebar'
import Searchtable from './searchtable'


function SearchView() {
    // console.log(window.location)
    return (
        <div>
            <Sidebar items={true }/>
            <Searchtable />
        </div>
    )
}

export default SearchView