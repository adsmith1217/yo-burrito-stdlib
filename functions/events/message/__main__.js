const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const mysql = require('mysql');

/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {string} user The user id of the user that invoked this event (name is usable as well)
* @param {string} channel The channel id the event was executed in (name is usable as well)
* @param {string} text The text contents of the event
* @param {object} event The full Slack event object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', event = {}, botToken = null, callback) => {

  // Only send a response to certain messages
//   if (text.match(/hey|hello|hi|sup/i)) {
//     callback(null, {
//       text: `Hey there! <@${user}> said ${text}`,
//       attachments: [
//         // You can customize your messages with attachments.
//         // See https://api.slack.com/docs/message-attachments for more info.
//       ]
//     });
//   } else {
//     callback(null, {});
//   }

    if (text.match(/[@][a-zA-Z0-9_\-. ]+:burrito:/)) {
        const connection = mysql.createConnection({
            host: "77.104.146.191",
            user: "adamsmi4_ybu",
            password: "yb1217",
            database: "adamsmi4_yo-burrito"
        });
    
        function insertBurrito(callback) {
            connection.connect(function(err) {
                console.log('Trying to connect...');
                if (err) throw err;
                console.log('Connected!');
                var RecipientUID = text.substr(text.indexOf('@') + 1, text.indexOf(' '));
                var DonorUID = user;
                var queryValues = "('" + RecipientUID + "', '" + DonorUID + "')";
                var queryString = "INSERT INTO burritos (RecipientUID, DonorUID) VALUES " + queryValues;
                console.log(queryString);
                connection.query(queryString, function (err, result, fields) {
                    if (err) throw err;
                });
            });
        };
    
        insertBurrito(function (err, result) {
            if (err) console.log("Database error!");
            else {
                callback(null, {
                    text: `<@${user}> gave you a burrito!`,
                });
            }
        });

        // callback(null, {
        // text: `<@${user}> has given you a :burrito:! \n <@${user}> said: ${text}`,
        // attachments: [
        //     // You can customize your messages with attachments.
        //     // See https://api.slack.com/docs/message-attachments for more info.
        // ]
        // });
    } else {
        callback(null, {});
    }

};
