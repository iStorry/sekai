const { Command, Argument } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'quote',
            runIn: ["text"],
            cooldown: 8,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_QUOTE_DESCRIPTION"),
            usage: "[channel:channel] <message:str>",
            usageDelim: " "
        });
    }

    async run(msg, [channel = msg.channel, msgId]) {
        if (!Argument.regex.snowflake.test(msgId)) throw "Invalid message ID. Use developer mode to copy IDs.";
        const message = await channel.messages.fetch(msgId).catch(() => null);
        if (!message) throw "Your message does not exist or is not in this channel. Try specifying the channel it is from.";
        const image = message.attachments.size > 0 ? this.checkAttachments(message.attachments.first().url) : null;
        const embed = new MessageEmbed()
            .setColor("#FAFAFA")
            .setDescription(message.content)
            .setTimestamp(message.createdAt)
            .setAuthor(message.author.tag, message.author.displayAvatarURL());
        if (image) embed.setImage(image);
        return msg.send(embed);
    }

    checkAttachments(attachment) {
        const imageLink = attachment.split(".");
        const typeOfImage = imageLink[imageLink.length - 1];
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return null;
        return attachment;
    }

};