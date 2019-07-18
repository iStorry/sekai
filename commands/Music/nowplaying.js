const MusicCommand = require("../../lib/structures/MusicCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["np", "currentlyplaying"],
            description: language => language.get("COMMAND_NOWPLAYING_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.send(msg.language.get("MUSIC_NOT_PLAYING"));

        const [song] = music.queue;
        if (!song) return msg.send(msg.language.get("MUSIC_NO_SONGS_IN_QUEUE"));

        return msg.send(new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing")
            .setTimestamp()
            .setFooter("© Sekai")
            .setDescription(`
                • **Title:** ${song.title}
                • **Author:** ${song.author}
                • **Duration:** ${song.friendlyDuration}
                • **Requested By:** ${song.requester}
                • **Link:** ${song.url}`)
            );
    }
};