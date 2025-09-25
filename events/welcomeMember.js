module.exports = (client) => {
    client.on('guildMemberAdd', member => {
        // grabbing channel_id from .env
        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        if(!channel) return; // no channel returns

        // welcoming message
        channel.send(`🎉 Welcome to the server, ${member.user.tag}! You are now a Tylor!`);
    });
};