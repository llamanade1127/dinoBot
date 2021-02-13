const Discord = require('discord.js');
const fileSys = require('../../client/editFiles.js');
module.exports = (member) => {
    fileSys.removeClient(member.id);
    console.log(`Member removed!`)
} 