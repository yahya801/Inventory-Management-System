
module.exports = {
 createusertable:"CREATE TABLE `Users`(`UserID` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL,`password` varchar(255) NOT NULL, PRIMARY KEY (`UserID`)) ",
 adduser: "INSERT INTO `Users`(`username`,`password`) VALUES (?,?)",
 searchuser: "Select * from `Users` WHERE username = ?"
};
