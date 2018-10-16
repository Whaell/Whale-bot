const fs = require('fs');
var path = require('path');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console); // Why are we doing this first?
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
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
    if (message.substring(0, 1) == '!') {
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
            case 'archive': {
                let messageget = bot.getMessages(channelID, limit, (callback));
                 messageget(500524976902766614, 10, (messageArray) => {
                    if (messageArray) throw console.log('Message Array saved');
                    console.log('Not!!!!');
                });
                fs.appendFileSync('Archive.txt', messageArray, (err) => {
                    if (err) throw console.log('The file has not been saved');
                    console.log('The file has been saved!');
                    });
            }
                }; 
            // Just add any case commands if you want to..
         }
     }
);