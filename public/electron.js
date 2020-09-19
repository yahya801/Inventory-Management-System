const electron = require("electron");
const { ipcMain, dialog } = require("electron");
const bcrypt = require("bcrypt");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mysql = require("mysql");
const DB = require("./database");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const { connect } = require("http2");
let mainWindow;
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: null,
  database: "popular_trader",
});

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: false,
    title: "Popular Traders",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.setBackgroundColor("#56cc5b10");

  mainWindow.once("ready-to-show", () => {
    // createconnection();
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on("closed", function () {
    // endconnection();
    app.quit();
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("Addusername", (event, arg) => {
  const username = arg.username;
  let password;

  bcrypt.hash(arg.password, 10, function (err, hash) {
    password = hash;
    let userfound = false;
    let user = [username, password];
    connection.query(DB.searchuser, [username], (err, result) => {
      // console.log(result);
      if (result.length != 0) {
        event.reply("Userexists", "User Already Exists");
        // console.log("User found");
      } else {
        connection.query(DB.adduser, user, (err) => {
          if (err) {
            console.log(err);
          } else {
            event.reply("Useradded", "Successfully Added User");
          }
        });
      }
    });
  });
});

ipcMain.on("Userlogin", (event, arg) => {
  // createconnection()
  // console.log(arg);
  var login;
  connection.query(DB.searchuser, [arg.username], (err, result) => {
    if (err) {
      event.reply("Userloggedinfailed", "Incorrect Password/Username");
    } else {
      bcrypt.compare(arg.password, result[0].password, function (err, result) {
        if (result === true) {
          login = result;
          event.reply("Userloggedin", "Successfully User Logged in");
        } else {
          event.reply("Userloggedinfailed", "Incorrect Password or Username");
        }
      });
    }
  });
  // endconnection()
});

ipcMain.on("AddItems", async (event, arg) => {
  console.log(arg);
  item = [arg.productname, arg.description, arg.category, arg.origin];
  connection.query(DB.additem, item, (err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("Item added")
      // event.reply("ItemAdded", "Successfully Added Item");
    }
  });
});
ipcMain.on("ItemsQuery", async (event) => {
  connection.query(DB.viewitems, (err, result) => {
    event.sender.send("ItemsQuerySuccessful", result);

    //  console.log(result[0].itemname,"hhh")
    //  console.log(result[1])
  });
});
ipcMain.on("DeleteItem", (event, arg) => {
  // console.log(arg)
  let options = {
    buttons: ["Yes", "No", "Cancel"],
    message: "Do you really want to quit?",
  };
  itemid = [arg];
  connection.query(DB.deleteitems, itemid, (err) => {
    if (err) {
      console.log(err);
      let response = dialog.showMessageBox(options);
      console.log(response), dialog;
    } else {
      event.sender.send("DeletedSuccessfully");
      // console.log("Deleted Successfully")
    }
  });
});
ipcMain.on("EditItemQuery", (event, arg) => {
  if (arg) {
    // console.log(arg)
    itemid = [arg];
    connection.query(DB.selecteditem, itemid, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        event.sender.send("ItemsEditQuerySuccessful", result);
      }
    });
  }
});
ipcMain.on("EditItem", (event, arg) => {
  query = [
    arg.productname,
    arg.description,
    arg.category,
    arg.origin,
    arg.itemID,
  ];
  connection.query(DB.updateitem, query, (err) => {
    if (err) {
      console.log(err);
    } else {
      //  console.log("Updated")
    }
  });
});
ipcMain.on("SearchItems", (event, arg) => {
  // console.log(arg)
  connection.query(DB.searchItem, arg, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      event.sender.send("SearchItemResult", result);
    }
  });
});

ipcMain.on("AddInventory", (event, arg) => {
  query = [
    arg.lotno,
    arg.date,
    arg.noofbags,
    arg.noofbags,
    arg.totalweight,
    arg.price,
    arg.labourexpense,
    arg.transportexpense,
    arg.cartonexpense,
    arg.otherexpense,
    arg.totalexpense,
    arg.ItemID,
  ];
  // connection.query(DB.lotnosearch,[arg.lotno],(err,result) => {
  //   if(result.length == 0){
  connection.query(DB.addinventory, query, (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  // }
  //   else{
  //     event.sender.send("Lotnoerror","LotNo already exists")
  //   }
  // })
});
ipcMain.on("InventoryQuery", (event, err) => {
  connection.query(DB.YYYYinventoryview, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      event.sender.send("InventoryQuerySuccessful", result);
    }
  });
});
ipcMain.on("DeleteInventory", (event, arg) => {
  connection.query(DB.inventorydelete, [arg], (err) => {
    if (err) {
      console.log(err);
    }
  });
});
ipcMain.on("EditInventory", (event, arg) => {
  console.log(arg);
  query = [
    arg.lotno,
    arg.date,
    arg.noofbags,
    arg.leftbags,
    arg.price,
    arg.totalweight,
    arg.labourexpense,
    arg.transportexpense,
    arg.cartonexpense,
    arg.otherexpense,
    arg.totalexpense,
    arg.inventID,
  ];
  connection.query(DB.inventoryupdate, query, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated");
    }
  });
});
ipcMain.on("AddClient", (event, arg) => {
  query = [arg.clientname, arg.companyname, arg.shopaddress, arg.contact];
  let options = {
    // buttons: ["Yes", "No", "Cancel"],
    message: "Client Already Exists",
  };
  connection.query(DB.addclientcheck, [arg.clientname], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      // console.log(result.length)
      if (result.length === 0) {
        connection.query(DB.addclient, query, (err) => {
          if (err) {
            console.log(err);
          } else {
            event.sender.send("ClientAdded");
          }
        });
      } else {
        let response = dialog.showMessageBox(options);
        console.log(response), dialog;
      }
    }
  });
});

ipcMain.on("EditClient", (event, arg) => {
  query = [
    arg.clientname,
    arg.companyname,
    arg.shopaddress,
    arg.contact,
    arg.clientID,
  ];
  connection.query(DB.clientupdate, query, (err) => {
    if(err){
      console.log(err)
    }
    else{
      event.sender.send("ClientUpdated")
    }
  });
});
ipcMain.on("ClientView", (event) => {
  connection.query(
    DB.viewclient,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result)
        event.sender.send("ClientViewResult", result);
      }
    },
    []
  );
});

ipcMain.on("DeleteClient",(event,arg) => {
  let options = {
    // buttons: ["Yes", "No", "Cancel"],
    message: "Client Cannot be Deleted as it is used somewhere else",
  };
  connection.query(DB.clientdelete,[arg],(err)=>{
    if(err){
      let response = dialog.showMessageBox(options);
      console.log(response), dialog;
    }
    else{
      event.sender.send("ClientDeleted")
    }
  })
})

ipcMain.on("ViewBroker", (event) => {
  connection.query(DB.viewbroker, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      event.sender.send("BrokerViewResult", result);
    }
  });
});

ipcMain.on("AddBroker", (event, arg) => {
  query = [arg.brokername, arg.brokerinfo, arg.contact];
  connection.query(DB.addbroker, query, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
ipcMain.on("DeleteBroker", (event, arg) => {
  // query = [arg.brokerID]
  connection.query(DB.brokerdelete, [arg], (err) => {
    if (err) {
      console.log(err);
    }
  });
});
ipcMain.on("EditBroker", (event, arg) => {
  query = [arg.brokername, arg.brokerinfo, arg.contact, arg.brokerID];
  connection.query(DB.brokerupdate, query, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

ipcMain.on("BillInventory", (event, arg) => {
  connection.query(DB.billinventform, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      event.sender.send("InventoryOptions", result);
    }
  });
});
async function createconnection() {
  connection.connect();
  // console.log("Connection Succsessful");
}

function endconnection() {
  connection.end();
  // console.log("Connection Ended");
}
