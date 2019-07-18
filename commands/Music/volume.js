const { MusicCommand } = require("../../index");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: false,
            requireMusic: true,
            cooldown: 8,
            aliases: ["changevol", "setvolume"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_VOLUME_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[volume:integer]"
        });
    }

    async run(msg, [volume]) {
        if (!volume) return msg.send(`🔈 | ***Guild's Current Music Volume is:*** ${msg.guild.settings.misc.volume}`);
        if (volume <= 0 || volume >= 100) return msg.send(`***Volume can not be lower than 0 or higher than 100.***`);

        await msg.guild.music.setVolume(volume);

        return msg.send(`***Volume has been set to:*** ${volume}`);
    }

};