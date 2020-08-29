import React from "react";
import {Link} from 'react-router-dom'
import  "./styles.css";

function sidebar(props) {
  
  return (
    <div>
      
      <div className="sidebar">
       
        <Link style={{backgroundColor: "#132567"}} to="/dashboard" > Popular Traders</Link>
      
        <Link className={props.home ? " fa fa-user active " : "fa fa-user"} to="/dashboard"> Home</Link>
        <Link className={props.bill ? "fa fa-users active" : "fa fa-users"} to="/bill">   Bill</Link>
        <Link className={props.inventory? "fa fa-shopping-basket active" : "fa fa-shopping-cart"} to="/inventory"> Inventory</Link>
        <Link className={props.client ? "active" : null} to="/client"> Client</Link>
        <Link className={props.products ? "active" : null} to="/products"> Products</Link>
        <Link className={props.brokers ? "active" : null} to="/brokers"> Brokers</Link>
        <Link className={props.sales ? "active" : null} to="/sales"> Sales </Link>
        <Link  className={props.items ? "active" : null} to="/items"> Items </Link>
      </div>
     
    </div>
  );
}

export default sidebar;
