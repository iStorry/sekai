const { MusicCommand } = require("../../index");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: false,
            requireMusic: true,
            cooldown: 10,
            aliases: ["loopsong", "repeat", "ripeti", "répéte", "repite"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LOOP_DESCRIPTION"),
            usage: "[queue|song]"
        });
    }

    async run(msg, [queueOrSong = "song"]) {
        const { music } = msg.guild;
        if (!music.playing) return msg.send(msg.language.get("MUSIC_NOT_PLAYING"));

        if (queueOrSong === "song") {
            music.looping = !music.looping;
        } else {
            if (music.queue.length * 2 > 1000) return msg.send(msg.language.get("COMMAND_MUSIC_LOOP_MAX_QUEUE"));
            music.queue = music.queue.concat(music.queue);
        }

        return msg.send(`🎧 ${queueOrSong === "song" ? "Song" : "Queue"} looping is now ${queueOrSong === "queue" ? "The whole queue will now repeat." : music.looping ? "enabled" : "disabled"}.`);
    }

};
