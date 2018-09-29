const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const getBurritoCount = require('../../helpers/get_burrito_count.js');
console.log(getBurritoCount);
/**
* /burrito
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
    return getBurritoCount.getCount();
    console.log(user);
    var count = 0;
    callback(null, {
        text: `Hi, <@${user}>! You have been given ` + count + ` burritos.`,
    });
};
