const klasa = require("klasa");
const discord = require("discord.js");
const { version } = require("./package.json");

module.exports = {
    ...klasa,
    ...discord,
    util: require("./lib/util/Util"),
    klasaUtil: klasa.util,
    discordUtil: discord.Util,
    version,
    klasaVersion: klasa.version,
    discordVersion: discord.version,
    klasaConstants: klasa.constants,
    discordConstants: discord.Constants,
    Command: require("./lib/structures/SekaiCommand"),
    MusicCommand: require("./lib/structures/MusicCommand"),
    ModLog: require("./util/modlog"),
    Song: require("./lib/structures/Song")
};