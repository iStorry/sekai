const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'logs',
            permissionLevel: 10,
            runIn: ['text'],
            description: 'Test Command.',
        });
    }

    async run(msg, [channel = msg.channel, ...message]) {
        console.log(msg.guild.settings.modlog)
    };
};