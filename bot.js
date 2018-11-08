/*eslint-disable no-undef-expression */
const fs = require('fs');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot uwuw!!!
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, id, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'pee':
                bot.sendMessage({
                    to: channelID,
                    message: 'God I **LOVE** pee'
                });
            break;
            case 'archive': {  // PLEASE clean this sometime PLEASE 
                bot.getMessages({channelID: channelID, limit: 50}, function (err, messages){
                    if (err) throw console.log('messages not received!')
                    
                    fs.appendFileSync('Archive.txt', Buffer.from(messages), function (err){
                        if (err) throw console.log('The file has not been saved');
                        console.log('The file has been saved!');
                    });

                });
            }
                }
            // Just add any case commands if you want to..
         }
     }
);