const { Command } = require('klasa');
const { get } = require("snekfetch");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");

Canvas.registerFont(`./assets/fonts/Roboto-Regular.ttf`, "Roboto");
Canvas.registerFont(`./assets/fonts/RobotoCondensed-Regular.ttf`, "Roboto Condensed");
Canvas.registerFont(`./assets/fonts/RobotoMono-Light.ttf`, "Roboto Mono");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'snowday',
            permissionLevel: 0,
            runIn: ['text', 'dm'],
            description: 'Snowday Rank.',
            usage: "<platform:string> <username:string>",
            usageDelim: " ",
        });
    }

    async run(msg, [platform, username]) {
        let code = await this.platformCode(platform);
        const { body } = await get(`https://rocketleague.tracker.network/api/appstats?platform=${code}&name=${username}`).catch(e => {
            return e;
        });
        if (body.platformUserId == undefined) return msg.send('** Invalid username or platform **');

        /// API Parser
        let rawname = body.platformUserHandle;
        let userID = body.platformUserId;
        let platformName = body.platformName;
        let stats = body.stats;
        let snowday = stats.filter(data => data.label == "Snowday");
        console.log(snowday);
        if (!snowday[0]) return msg.send(`** No Snowday Data**`);
        /// Rough
        let rankLabel = snowday[0].subLabel.split("]");
        let rankMain = rankLabel[1] ? rankLabel[1] + ` (${snowday[0].displayValue})` : "Unknown";
        /// Design Config
        let fontColor = "#FFFFFF";
        try {

        const bg = await this.getBase();
        const rank = await this.ranksIcon(snowday[0].subLabel);
        const img = await new Canvas(400, 100)
            .addImage(bg, 0, 0, 400, 180)
            .setColor(fontColor)
            .setTextFont("25px Roboto")
            .addText(rawname ? rawname : "Unknown", 25, 50)
            .setTextFont("16px Roboto")
            .addText(rankMain ? rankMain : "", 22, 72.5)
            .addImage(rank, 290, 5, 100, 100)
            .setTextFont("18px 'Roboto Condensed'")
            .addText(snowday[0].subLabel, 35, 140)
            .toBufferAsync();
            return msg.send({ files: [{ attachment: img, name: `${userID}.png` }] });
        } catch (e) {
            console.error(e);
            return msg.send(`***Oopsies, an error occoured, please try again!***`);
        }
    };

    async platformCode(platform) {
        switch (platform) {
            case "ps": case "ps4": case "Ps4": case "PS4": return 2;
            case "steam": case "pc": case "Pc": case "PC": return 3;
            case "xbox": case "xbx": case "Xbox": return 1;
        }
    }

    async getBase(icon) {
        return `./assets/rocketleague/bg/black.png`;
    }

    async ranksIcon(label) {
        switch (label) {
            /// Grand Champion
            case "[I] Grand Champion": return `./assets/rocketleague/ranks/champion/grandchampion.png`;
            /// Champion
            case "[IV] Champion III": case "[III] Champion III": case "[II] Champion III": case "[I] Champion III": return `./assets/rocketleague/ranks/champion/champion3.png`;
            case "[IV] Champion II": case "[III] Champion II": case "[II] Champion II": case "[I] Champion II": return `./assets/rocketleague/ranks/champion/champion2.png`;
            case "[IV] Champion I": case "[III] Champion I": case "[II] Champion I": case "[I] Champion I": return `./assets/rocketleague/ranks/champion/champion1.png`;
            /// Diamond
            case "[IV] Diamond III": case "[III] Diamond III": case "[II] Diamond III": case "[I] Diamond III": return `./assets/rocketleague/ranks/diamond/diamond3.png`;
            case "[IV] Diamond II": case "[III] Diamond II": case "[II] Diamond II": case "[I] Diamond II": return `./assets/rocketleague/ranks/diamond/diamond2.png`;
            case "[IV] Diamond I": case "[III] Diamond I": case "[II] Diamond I": case "[I] Diamond I": return `./assets/rocketleague/ranks/diamond/diamond1.png`;
            /// Platinum
            case "[IV] Platinum III": case "[III] Platinum III": case "[II] Platinum III": case "[I] Platinum III": return `./assets/rocketleague/ranks/platinum/platinum3.png`;
            case "[IV] Platinum II": case "[III] Platinum II": case "[II] Platinum II": case "[I] Platinum II": return `./assets/rocketleague/ranks/platinum/platinum2.png`;
            case "[IV] Platinum I": case "[III] Platinum I": case "[II] Platinum I": case "[I] Platinum I": return `./assets/rocketleague/ranks/platinum/platinum1.png`;
            /// Gold
            case "[IV] Gold III": case "[III] Gold III": case "[II] Gold III": case "[I] Gold III": return `./assets/rocketleague/ranks/gold/gold3.png`;
            case "[IV] Gold II": case "[III] Gold II": case "[II] Gold II": case "[I] Gold III": return `./assets/rocketleague/ranks/gold/gold2.png`;
            case "[IV] Gold I": case "[III] Gold I": case "[II] Gold I": case "[I] Gold I": return `./assets/rocketleague/ranks/gold/gold1.png`;
            /// Silver
            case "[IV] Silver III": case "[III] Silver III": case "[II] Silver III": case "[I] Silver III": return `./assets/rocketleague/ranks/silver/silver3.png`;
            case "[IV] Silver II": case "[III] Silver II": case "[II] Silver II": case "[I] Silver II": return `./assets/rocketleague/ranks/silver/silver2.png`;
            case "[IV] Silver I": case "[III] Silver I": case "[II] Silver I": case "[I] Silver I": return `./assets/rocketleague/ranks/silver/silver1.png`;
            /// Bronze
            case "[IV] Bronze III": case "[III] Bronze III": case "[II] Bronze III": case "[I] Bronze III": return `./assets/rocketleague/ranks/bronze/bronze3.png`;
            case "[IV] Bronze II": case "[III] Bronze II": case "[II] Bronze II": case "[I] Bronze II": return `./assets/rocketleague/ranks/bronze/bronze2.png`;
            case "[IV] Bronze I": case "[III] Bronze I": case "[II] Bronze I": case "[I] Bronze I": return `./assets/rocketleague/ranks/bronze/bronze1.png`;
            /// Unranked
            case "[I] Unranked": return `./assets/rocketleague/ranks/unranked/unranked.png`;
        }
    }
    
};
