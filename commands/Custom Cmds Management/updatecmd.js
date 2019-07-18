const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["changecmd"],
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
        if (cmd) {
            const remove = await msg.guild.settings.update("customcmds", cmd, { action: "remove" });
            const add = await msg.guild.settings.update("customcmds", { content: content.join(" "), name: cmd.name }, { action: "add" });
            if (add.errors.length || remove.errors.length) return msg.send(`***There was an error, try again.***`);
            return msg.send(`***\`${name}\` ${msg.language.get("MESSAGE_CMD_UPDATED")} ${msg.author.tag}!***`);
        } else {
            return msg.reply(`***\`${name}\` ${msg.language.get("MESSAGE_CMD_NOTFOUND")}***`);
        }
    }

};
