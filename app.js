
const Discord = require("discord.js");
const fileSys = require('./client/editFiles.js');
const server = require('./server/serverHandle.js');
const {username, password, port, ip,token, cacheLocation} = require('./config.json');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], disableEveryone: false });
const fs = require('fs');
const path = require('path');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.on('ready', () => init()); //Start server on startup
client.on('disconnect', () => disconnect()); //Disconnect from server incase of error


function disconnect(){
    console.log('Bot disconnected! Disconnecting from server!');
    server.close();
}
function init(){
    server.startServer(ip, username, password, port);
    clearCache(cacheLocation);
    console.log("All systems up and running!");
    //testUpload();
}
function testUpload(){
    server.uploadFiles('../test.txt', '');
}
function clearCache(cache){
    console.log('Clearing cache!');
    fs.readdir(cache, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(cache, file), err => {
            if (err) throw err;
          });
        }
    });
}
client.login(token);