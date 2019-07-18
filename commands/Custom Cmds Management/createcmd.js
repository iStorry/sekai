const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'createcmd',
            runIn: ["text"],
            cooldown: 10,
            aliases: ["addcmd"],
            permissionLevel: 9,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_ADD_CMD_DESCRIPTION"),
            usage: "<name:string> <content:string> [...]",
            usageDelim: " ",
        });
    }

    async run(msg, [name, ...content]) {
        name = name.toLowerCase();
        if (this.client.commands.has(name)) return msg.reply(`***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        const cmd = msg.guild.settings.customcmds.find(c => c.name.toLowerCase() === name);
        if (cmd) return msg.reply(`***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        await msg.guild.settings.update("customcmds", { content: content.join(" "), name: name });
        return msg.sendMessage(`***\`${name}\` ${msg.language.get("MESSAGE_CMD_ADDED")} ${msg.author.tag}!***`);
    }

};
