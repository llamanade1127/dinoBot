const { table } = require('console');
const fs = require('fs');
module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
        const evtArr = [];
        var index = 0;
        for (const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            evtArr.push([dirs, event_name]);
            index++;
            client.on(event_name, event.bind(null, Discord, client));
        }
        console.table(evtArr);
    }

    ['client', 'guild'].forEach(e => load_dir(e));

};