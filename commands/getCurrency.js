const fileSys = require('../client/editFiles.js');
const Discord = require('discord.js');

module.exports = {
    name:  "getcurrency",
    description: "Returns the currency of a user",
    async execute({message}){
        var currentSouls = fileSys.editPlayerData(message.author.id, 'souls', null, true, null);
        var currentBones = fileSys.editPlayerData(message.author.id, 'boneBox', null, true, null);
        var embed = new Discord.MessageEmbed().setTitle("Your current Currency!").setDescription(`User:${message.author} \n\n You currently have: \n\n ${currentSouls} souls \n ${currentBones} bones`);
        message.channel.send({embed:embed});
    }
}