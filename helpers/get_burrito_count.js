const mysql = require('mysql');

//Setup connection
const connection = mysql.createConnection({
    host: "77.104.146.191",
    user: "adamsmi4_ybu",
    password: "yb1217",
    database: "adamsmi4_yo-burrito"
});

module.exports = {
    //Query to get count of burritos by Slack User ID
    getBurritoCountByUser : function(callback, slackUserId) {
        var count = 0;
        connection.connect(function(err) {
            console.log('Trying to connect...');
            if (err) throw err;
            console.log('Connected!');
            var queryString = "SELECT Count(Id) AS Count FROM burritos WHERE RecipientUID = " + slackUserId;
            console.log(queryString);
            connection.query(queryString, function (err, result, fields) {
                if (err) throw err;
                count = result[0].Count;
                console.log(count);
                // return count;
            }).then( count => {return count} );
        });
        // return count;
    }
}

// //Call function
// getBurritoCountByUser(function (err, result) {
//     console.log('count');
//     if (err) console.log("Database error!");
//     else console.log(result);
// });

// //Export method
// module.exports = {
//     getCount : getBurritoCountByUser
// }