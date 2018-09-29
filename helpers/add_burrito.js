const mysql = require('mysql');

//Setup connection
const connection = mysql.createConnection({
    host: "77.104.146.191",
    user: "adamsmi4_ybu",
    password: "yb1217",
    database: "adamsmi4_yo-burrito"
});

//Query to get count of burritos by Slack User ID
var addBurritoByUser = function(callback) {
    connection.connect(function(err) {
        console.log('Trying to connect...');
        if (err) throw err;
        console.log('Connected!');
        var RecipientUID = 1;
        var DonorUID = 2;
        var queryValues = "('" + RecipientUID + "', '" + DonorUID + "')";
        var queryString = "INSERT INTO burritos (RecipientUID, DonorUID) VALUES " + queryValues;
        console.log(queryString);
        connection.query(queryString, function (err, result, fields) {
            if (err) throw err;
            console.log('Inserted 1 burrito');
        });
    });
};

//Call function
addBurritoByUser(function (err, result) {
    if (err) console.log("Database error!");
    else console.log(result);
});
