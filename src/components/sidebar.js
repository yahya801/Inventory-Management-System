import React from "react";
import  "./styles.css";

function sidebar(props) {
  console.log(props.home)
  return (
    <div>
      
      <div className="sidebar">
       
        <a  style={{backgroundColor: "#132567"}} href="/dashboard"> Popular Traders</a>
      
        <a  className={props.home ? " fa fa-user active " : "fa fa-user"} href="/dashboard"> Home</a>
        <a className={props.bill ? "active" : null} href="/bill">Bill</a>
        <a className={props.inventory? "active" : null} href="/inventory">Inventory</a>
        <a className={props.client ? "active" : null} href="/client">Client</a>
        <a className={props.products ? "active" : null} href="/products">Products</a>
        <a className={props.brokers ? "active" : null} href="/brokers">Brokers</a>
        <a className={props.sales ? "active" : null} href="/sales">Sales </a>
        <a className={props.items ? "active" : null} href="/items">Items </a>
      </div>
     
    </div>
  );
}

export default sidebar;
