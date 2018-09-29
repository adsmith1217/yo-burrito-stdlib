const mysql = require('mysql');

//Setup connection
const connection = mysql.createConnection({
    host: "77.104.146.191",
    user: "adamsmi4_ybu",
    password: "yb1217",
    database: "adamsmi4_yo-burrito"
});

//Query to get count of burritos by Slack User ID
var getBurritoCountByUser = function(callback, slackUserId) {
    connection.connect(function(err) {
        console.log('Trying to connect...');
        if (err) throw err;
        console.log('Connected!');
        var slackUserId = 1;
        var queryString = "SELECT Count(Id) AS Count FROM burritos WHERE SlackUserId = " + slackUserId;
        console.log(queryString);
        connection.query(queryString, function (err, result, fields) {
            if (err) throw err;
            var count = result[0].Count;
            console.log(count);
            callback(null, count);
        });
    });
};

module.exports = {
    getCount : getBurritoCountByUser
}

//Call function
getBurritoCountByUser(function (err, result) {
    console.log('count');
    if (err) console.log("Database error!");
    else console.log(result);
});