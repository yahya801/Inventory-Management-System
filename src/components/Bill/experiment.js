import React, { useState, useEffect } from "react";
import Select from "react-select";
import Sidebar from "../../components/sidebar";
const { ipcRenderer } = window.require("electron");

function Experiment() {
  const [Items, SetItems] = useState([]);
  let options = [];
  // { value: "chocolate", label: "Chocolate" },
  // { value: "strawberry", label: "Strawberry" },
  // { value: "vanilla", label: "Vanilla" }

  const [selectedoption, SetselectedOption] = useState();

  const handleChange = (selectedOption) => {
    // SetselectedOption(selectedoption.value);
    console.log(selectedOption);
    console.log(`Option selected:`, selectedOption.value);
  };
  useEffect(() => {
    ipcRenderer.send("ItemsQuery");

    ipcRenderer.on("ItemsQuerySuccessful", async (err, result) => {
      //   SetItems(result);
      console.log(result);
      result.forEach((element) => {
        console.log(element.itemname);
        options.push({
          value: `${element.ItemID}`,
          label: `${element.itemname}/PT${element.ItemID}`,
        });
        console.log(options)
      });
    });
  }, []);
  return (
    <div>
      <Sidebar />
      <Select
        value={selectedoption}
        onChange={(e) => handleChange(e)}
        options={options}
        isSearchable={true}
      />
    </div>
  );
}

export default Experiment;
