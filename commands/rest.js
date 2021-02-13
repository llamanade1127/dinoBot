const fileSys = require('../client/editFiles.js');
const Discord = require('discord.js');
module.exports = {
    name: "rest",
    description:"Rests the dinos",
    async execute({message}){
        var newRest =  fileSys.editFile('Stamina', getRandomInt(10), fileSys.editPlayerData(message.author.id, steamId, null, true, null), '+', true)
        var restEmbed = new Discord.MessageEmbed().setTitle('Your dino has rested!').setDescription(`User:${message.author} your dino now has %${newRest}!`);
        message.channel.send({embed:restEmbed});
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }