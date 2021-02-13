const Discord = require('discord.js');
const fileSys = require('../client/editFiles.js');

module.exports = {
    name: 'adduser',
    hidden: true,
    description: "Adds a user to db",
    async execute({message, text}){
        if(text == "" )return;
        fileSys.addClient(text, message.author.id);
        fileSys.editPlayerData(message.author.id, bIsSetUp, true, null, null)
    }
}