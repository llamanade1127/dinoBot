
const fileSys = require('../client/editFiles.js');
const Discord = require('discord.js');

module.exports = {
    name: 'heal',
    description: "Heals your dino but costs 2,000 souls",
    cost: "2,000 souls",
    async execute({message}){
        fileSys.editFile('Health', 100, fileSys.editPlayerData(message.author.id, steamId, null, true, null), null, false);
        if(fileSys.editPlayerData(message.author.id, 'souls', null, true, null) < 2000){
            var msgEmbed = new Discord.MessageEmbed().setTitle(`You dont have enough souls!`).setDescription(`User: ${message.author} \n\n You dont have enough souls to complete the healing process! \n\n you need at least **2000* souls!`)
            return message.channel.send({embed:msgEmbed})
        }
        var newCurr = fileSys.editPlayerData(message.author.id, 'souls', 2000, true, '-');
        var embed = new Discord.MessageEmbed().setTitle(`Your dino has healed!`).setDescription(`User:${message.author} your dino is now fully healed \n\n You now only have ${newCurr} souls!`);
        message.channel.send({embed:embed});
    }
}