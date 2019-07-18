const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'avatar',
            runIn: ["text", "dm"],
            cooldown: 5,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_AVATAR_DESCRIPTION"),
            usage: '<user:user>',
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [person = msg.author]) {
        const message = new MessageEmbed().setColor(0x673AB7).setTitle(person.tag).setImage(person.displayAvatarURL({ size: 2048 })).setTimestamp();
        await msg.send(message);
    }

};