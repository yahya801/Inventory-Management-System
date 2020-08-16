
module.exports = {
 createusertable:"CREATE TABLE `Users`(`UserID` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL,`password` varchar(255) NOT NULL, PRIMARY KEY (`UserID`)) ",
 adduser: "INSERT INTO `Users`(`username`,`password`) VALUES (?,?)",
 searchuser: "Select * from `Users` WHERE username = ?",
 createitemtable: "CREATE TABLE `Items`(`ItemID` int NOT NULL AUTO_INCREMENT,`itemname`  varchar(255) NOT NULL,`description` varchar(255),`category` varchar(255),`origin` varchar(255),PRIMARY KEY (`ItemID`))",
 additem: "INSERT INTO `Items`(`itemname`,`description`,`category`,`origin`) VALUES (?,?,?,?)",
 viewitems: "SELECT * FROM `Items`",
 deleteitems: "DELETE FROM `Items` WHERE `ItemID` = ?",
 selecteditem: "SELECT * FROM `Items` WHERE `ItemID` = ?",
 updateitem: "UPDATE `Items` SET `itemname` = ?,`description`= ?, `category` = ?, `origin` = ?  WHERE `ItemID` = ?"
};
