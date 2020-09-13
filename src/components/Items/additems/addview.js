import React from "react";
import Sidebar from "../../sidebar";
import Addpage from "./addpage";
import Navbar from "../../navbar";
function Addview() {
  return (
    <div>
      <Sidebar productsdropdown={true} productsadd={true} />
      <Navbar />
      <Addpage />
    </div>
  );
}

export default Addview;
