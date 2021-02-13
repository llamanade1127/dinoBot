const {prefix} = require('../../config.json');
const _Discord = require('discord.js');

const validatePermissions = (permissions) => {
    const validPermissions = [
      'CREATE_INSTANT_INVITE',
      'KICK_MEMBERS',
      'BAN_MEMBERS',
      'ADMINISTRATOR',
      'MANAGE_CHANNELS',
      'MANAGE_GUILD',
      'ADD_REACTIONS',
      'VIEW_AUDIT_LOG',
      'PRIORITY_SPEAKER',
      'STREAM',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'SEND_TTS_MESSAGES',
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'MENTION_EVERYONE',
      'USE_EXTERNAL_EMOJIS',
      'VIEW_GUILD_INSIGHTS',
      'CONNECT',
      'SPEAK',
      'MUTE_MEMBERS',
      'DEAFEN_MEMBERS',
      'MOVE_MEMBERS',
      'USE_VAD',
      'CHANGE_NICKNAME',
      'MANAGE_NICKNAMES',
      'MANAGE_ROLES',
      'MANAGE_WEBHOOKS',
      'MANAGE_EMOJIS',
    ]
  
    for (const permission of permissions) {
      if (!validPermissions.includes(permission)) {
        throw new Error(`Unknown permission node "${permission}"`)
      }
    }
}

module.exports = ( Discord, client, message) => {
    const {prefix} = require('../../config.json');
    //console.log(prefix);
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    //console.log(prefix)
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const noCommand = message.content.slice(prefix.length);
    const command = client.commands.get(cmd);
    var cmdArgs =  {
        client: client,
        Discord: Discord,
        message: message,
        args: args,
        prefix: prefix,
        text: message.content.slice(prefix.length),
        command:cmd,
        author: message.author,
        woCom: noCommand
    }
    if(!command) return message.reply('That command dosnt exist! Please use !help to see a list of commands');
    //comand elemenets:
    /**
     * name: name of it
     * description: description
     * minArgs
     * maxArgs
     * permissions
     */

    var errEmb = new _Discord.MessageEmbed().setTitle("Error with command!").setFooter(new Date).setColor(15158332);;
    if(command.minArgs){
        if(cmdArgs.args < command.minArgs){
            errEmb.setDescription(`You have to put in at least ${command.minArgs} arguments!`)
            return message.reply({embed:errEmb})
        }
    }
    if(command.maxArgs){
        if(cmdArgs.args > command.maxArgs){
            errEmb.setDescription(`You put in too many arguments! you can only put in a max of ${command.minArgs} arguments!`)
            return message.reply({embed:errEmb})
        }
    }

    if (permissions.length) {
        if (typeof permissions === 'string') {
          permissions = [permissions];
        }
        validatePermissions(permissions);
    }
    try{
        command.execute(cmdArgs);
    } catch(err){
        console.log('Error executing command');
        errEmb.setDescription("There was a error executing command " + command.name  + "! please contact mods for support.");
        return message.reply({embed: errEmb});
    }

}