const Discord = require('discord.js');
const fileSys = require('../../client/editFiles.js');
module.exports = (member) => {
    fileSys.addClient(null, member.id);
    var firstEmbed = new Discord.MessageEmbed().setTitle(`Welcome!`).setDescription(`This server requires your steamId to to aceess the player data in the server. \n Please enter your steamId below\n\n **Dont know how to get your steamId?**\n [Go here to see how to get it](https://help.daybreakgames.com/hc/en-us/articles/230631407-How-do-I-locate-my-Steam-ID-)`);
    member.send({embed:firstEmbed});

    const filter = m => m.author.id === message.author.id

    message.author.dmChannel.awaitMessages(filter)
     .then((collected) => {
        fileSys.editPlayerData(message.author.id, 'steamId', collected.content, false, null);
        var finalEmbed = new Discord.MessageEmbed().setTitle('All set up!').setDescription(`We now have you in the system.\n Thank you!`).setFooter(`Your steamId: ${collected.content} \n Your discord id: ${collected.content}`);
        member.send({embed:finalEmbed});
     });
}