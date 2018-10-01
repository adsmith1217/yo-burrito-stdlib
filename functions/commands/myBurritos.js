const lib = require('lib')({token: process.env.STDLIB_TOKEN});
// const getBurritoCount = require('../../helpers/get_burrito_count.js');
const mysql = require('mysql');

/**
* /myburritos
*
*   Returns the number of burritos a user has left to give.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
    var count;

    const connection = mysql.createConnection({
        host: "77.104.146.191",
        user: "adamsmi4_ybu",
        password: "yb1217",
        database: "adamsmi4_yo-burrito"
    });

    function getBurritoCountByUser(callback) {
        var count = 0;
        connection.connect(function(err) {
            console.log('Trying to connect...');
            if (err) throw err;
            console.log('Connected!');
            var slackUserId = "'" + user + "'";
            var queryString = "SELECT Count(Id) AS Count FROM burritos WHERE RecipientUID = " + slackUserId;
            console.log(queryString);
            connection.query(queryString, function (err, result, fields) {
                if (err) throw err;
                count = result[0].Count;
                // console.log(count);
                // return count;
                callback(null, count);
            });
        });
    };

    getBurritoCountByUser(function (err, result) {
        if (err) console.log("Database error!");
        else {
            console.log('count: '+result);
            count = result;
            callback(null, {
                text: `Hi, <@${user}>! You have been given ` + count + ` burritos.`,
            });
        }
    });
    
};
