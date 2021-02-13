const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    var arr = [];
    var index = 1;
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            var commandArr = [command.name, command.description];
            arr.push(commandArr);
            console.log(command.name);
        } else {
            continue;
        }
        index++;
    }
    console.table(arr);
}