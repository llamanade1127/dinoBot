

module.exports = {
    name: "ping",
    description: "Pings the bot",
    async execute({message}){
        message.channel.send(`🏓Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}