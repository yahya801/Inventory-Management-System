const electron = require("electron");
const { ipcMain } = require("electron");
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
      console.log(result);
      if (result.length != 0) {
        event.reply("Userexists", "User Already Exists");
        console.log("User found");
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
  console.log(arg);
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

ipcMain.on("AddItems",async (event, arg) => {
  console.log(arg);
  item = [arg.itemname, arg.description, arg.category, arg.origin];
  connection.query(DB.additem,item,(err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Item added")
      
      // event.reply("ItemAdded", "Successfully Added Item");
    }
  })
});
ipcMain.on("ItemsQuery",async (event)=> {
 connection.query(DB.viewitems,(err,result) => {
  event.sender.send("ItemsQuerySuccessful", result);
  
  //  console.log(result[0].itemname,"hhh")
  //  console.log(result[1])
 })
})
ipcMain.on("DeleteItem",(event,arg)=> {
  console.log(arg)
  itemid = [arg]
  connection.query(DB.deleteitems,itemid,(err) => {
    if(err){
      console.log(err)
    }
    else{
      event.sender.send("DeletedSuccessfully");
      console.log("Deleted Successfully")
    }
  })
})
ipcMain.on("EditItemQuery",  (event,arg)=>{
  if(arg){
    console.log(arg)
    itemid = [arg]
    connection.query(DB.selecteditem,itemid,(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        event.sender.send("ItemsEditQuerySuccessful", result);
      }
    })
  }
})
ipcMain.on("EditItem",(event,arg) => {
  query = [arg.itemname,arg.description,arg.category,arg.origin,arg.itemID]
 connection.query(DB.updateitem,query,(err)=>{
   if(err){
     console.log(err)
   }
   else{
     console.log("Updated")
   }
 })
})
ipcMain.on("SearchItems" ,(event,arg) => {
  console.log(arg)
  connection.query(DB.searchItem,arg,(err,result) => {
    if(err){
      console.log(err)
    }
    else{
      event.sender.send("SearchItemResult", result);
    }
  })
})
async function createconnection() {
  connection.connect();
  console.log("Connection Succsessful");
}

function endconnection() {
  connection.end();
  console.log("Connection Ended");
}
