const Discord = require('discord.js');
const {genderCost} = require('./costs.json');
const fileSys = require('../client/editFiles.js');
const ex = require('../client/exampleFile.js');
module.exports = {
    name: "changegender",
    description: "changes the gender of your dino.",
    cost: "500 souls",
    async execute({message}){
        var author = message.author;
        var authorCurrentSouls = fileSys.editPlayerData(author.id, 'souls', null, true, null);
        if(authorCurrentSouls < genderCost){
            var noMoneyEmbed = new Discord.MessageEmbed().setTitle('You dont have enough!').setDescription(`You need at least ${cost} to use this command!`);
            return message.channel.send({embed:noMoneyEmbed});
        }
        var steamId = fileSys.editPlayerData(author.id, 'steamId', null, true, null);
        var newCurr = fileSys.editPlayerData(author.id, 'souls', genderCost, true, '-');
        var bcurrentGender = fileSys.editFile('Female', null, steamId, '!', true);
        var currentgender;
        if(bcurrentGender){
            currentgender = "Female";
        } else {
            currentgender = "Male";
        }
        var embed = new Discord.MessageEmbed().setTitle(`Your dino has changed genders!`).setDescription(`User ${author}: \n\n You have changed your dinos gender! \n It is now a ${currentgender} \n Cost: ${genderCost}\n Current souls: ${newCurr}`);
        message.channel.send({embed:embed});
    }
}