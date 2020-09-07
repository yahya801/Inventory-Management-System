
module.exports = {
//USERS
 createusertable:"CREATE TABLE `Users`(`UserID` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL,`password` varchar(255) NOT NULL, PRIMARY KEY (`UserID`)) ",
 adduser: "INSERT INTO `Users`(`username`,`password`) VALUES (?,?)",
 searchuser: "Select * from `Users` WHERE username = ?",
//ITEMS
 createitemtable: "CREATE TABLE `Items`(`ItemID` int NOT NULL AUTO_INCREMENT,`itemname`  varchar(255) NOT NULL,`description` varchar(255),`category` varchar(255),`origin` varchar(255),PRIMARY KEY (`ItemID`))",
 additem: "INSERT INTO `Items`(`itemname`,`description`,`category`,`origin`) VALUES (?,?,?,?)",
 viewitems: "SELECT * FROM `Items`",
 deleteitems: "DELETE FROM `Items` WHERE `ItemID` = ?",
 selecteditem: "SELECT * FROM `Items` WHERE `ItemID` = ?",
 searchItem: "SELECT * FROM `Items` WHERE `itemname` LIKE ?",
 updateitem: "UPDATE `Items` SET `itemname` = ?,`description`= ?, `category` = ?, `origin` = ?  WHERE `ItemID` = ?",
//INVENTORY
 invetorytable: "CREATE TABLE `inventory` (`inventID` int NOT NULL AUTO_INCREMENT, `lotno` varchar(255) NOT NULL,`date` DATE, `noofbags` int,`leftbags` int, `totalweight` int,`priceperkg` int ,`labourexpense` int, `transportexpense` int,`cartonexpense` int,`otherexpense` int, `totalexpense` int, `ItemID` int,PRIMARY KEY (`inventID`),FOREIGN KEY (`ItemID`) REFERENCES items(ItemID))",
 addinventory: "INSERT INTO `inventory`(`lotno`,`date`,`noofbags`,`leftbags`,`totalweight`,`priceperkg`,`labourexpense`,`transportexpense`,`cartonexpense`,`otherexpense`,`totalexpense`,`ItemID`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
 lotnosearch: "SELECT * FROM `inventory` WHERE `lotno` = ?",
 inventoryview: "SELECT `inventory`.*,`items`.`itemname`,`items`.`description`,`items`.`origin`,`items`.`category` FROM `inventory` INNER JOIN `items` ON `inventory`.`ItemID` = `items`.`ItemID` ORDER BY `inventory`.`date` DESC",
 YYYYinventoryview: "SELECT `inventory`.*,`items`.`itemname`,`items`.`description`,`items`.`origin`,`items`.`category` FROM `inventory` INNER JOIN `items` ON `inventory`.`ItemID` = `items`.`ItemID` AND YEAR(`inventory`.`date`) = YEAR(CURDATE()) ORDER BY `inventory`.`date` DESC",
 inventorydelete: "DELETE FROM `inventory` WHERE `inventID` = ?",
 inventoryupdate: "UPDATE `inventory` SET `lotno` = ?,`date`=?,`noofbags`=?,`leftbags`=?,`priceperkg`=?,`totalweight`=?,`labourexpense`=?,`transportexpense`=?,`cartonexpense`=?,`otherexpense`=?,`totalexpense`=? WHERE `inventID`= ?"
};
