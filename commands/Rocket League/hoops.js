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
            name: 'hoops',
            permissionLevel: 10,
            runIn: ['text'],
            description: 'Hoops Rank.',
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
        let hoops = stats.filter(data => data.label == "Hoops");

        if (!hoops[0]) return msg.send(`** No Hoops Data**`);
        /// Rough
        let rankLabel = hoops[0].subLabel.split("]");
        let rankMain = rankLabel[1] ? rankLabel[1] + ` (${hoops[0].displayValue})` : "Unknown";
        /// Design Config
        let fontColor = "#FFFFFF";
        try {

        const bg = await this.getBase();
        const rank = await this.ranksIcon(hoops[0].subLabel);
        const img = await new Canvas(400, 100)
            .addImage(bg, 0, 0, 400, 180)
            .setColor(fontColor)
            .setTextFont("25px Roboto")
            .addText(rawname ? rawname : "Unknown", 25, 50)
            .setTextFont("16px Roboto")
            .addText(rankMain ? rankMain : "", 22, 72.5)
            .addImage(rank, 290, 5, 100, 100)
            .setTextFont("18px 'Roboto Condensed'")
            .addText(hoops[0].subLabel, 35, 140)
            .toBufferAsync();
            return msg.send({ files: [{ attachment: img, name: `${userID}.png` }] });
        } catch (e) {
            console.error(e);
            return msg.send(`***Oopsies, an error occoured, please try again!***`);
        }
        //let username = 

    };

    async platformCode(platform) {
        switch (platform) {
            case "ps": case "ps4": return 2;
            case "steam": case "pc": return 3;
            case "xbox": case "xbx": return 1;
        }
    }

    async getBase(icon) {
        return `./assets/rocketleague/bg/black.png`;
    }

    async ranksIcon(label) {
        switch (label) {
            /// Grand Champion
            case "[I] Grand Champion": return `./assets/rocketleague/ranks/champion /grandchampion.png`;
            /// Champion
            case "[III] Champion III": case "[II] Champion III": case "[I] Champion III": return `./assets/rocketleague/ranks/champion/champion3.png`;
            case "[III] Champion II": case "[II] Champion II": case "[I] Champion II": return `./assets/rocketleague/ranks/champion/champion2.png`;
            case "[III] Champion I": case "[II] Champion I": case "[I] Champion I": return `./assets/rocketleague/ranks/champion/champion1.png`;
            /// Diamond
            case "[III] Diamond III": case "[II] Diamond III": case "[I] Diamond III": return `./assets/rocketleague/ranks/diamond/diamond3.png`;
            case "[III] Diamond II": case "[II] Diamond II": case "[I] Diamond II": return `./assets/rocketleague/ranks/diamond/diamond2.png`;
            case "[III] Diamond I": case "[II] Diamond I": case "[I] Diamond I": return `./assets/rocketleague/ranks/diamond/diamond1.png`;
            /// Platinum
            case "[III] Platinum III": case "[II] Platinum III": case "[I] Platinum III": return `./assets/rocketleague/ranks/platinum/platinum3.png`;
            case "[III] Platinum II": case "[II] Platinum II": case "[I] Platinum II": return `./assets/rocketleague/ranks/platinum/platinum2.png`;
            case "[III] Platinum I": case "[II] Platinum I": case "[I] Platinum I": return `./assets/rocketleague/ranks/platinum/platinum1.png`;
            /// Gold
            case "[III] Gold I": case "[II] Gold I": case "[I] Gold I": return `./assets/rocketleague/ranks/gold/gold3.png`;
            case "[III] Gold I": case "[II] Gold I": case "[I] Gold I": return `./assets/rocketleague/ranks/gold/gold2.png`;
            case "[III] Gold I": case "[II] Gold I": case "[I] Gold I": return `./assets/rocketleague/ranks/gold/gold1.png`;
            /// Silver
            case "[III] Silver I": case "[II] Silver I": case "[I] Silver I": return `./assets/rocketleague/ranks/silver/silver3.png`;
            case "[III] Silver I": case "[II] Silver I": case "[I] Silver I": return `./assets/rocketleague/ranks/silver/silver2.png`;
            case "[III] Silver I": case "[II] Silver I": case "[I] Silver I": return `./assets/rocketleague/ranks/silver/silver1.png`;
            /// Bronze
            case "[III] Bronze I": case "[II] Bronze I": case "[I] Bronze I": return `./assets/rocketleague/ranks/bronze/bronze3.png`;
            case "[III] Bronze I": case "[II] Bronze I": case "[I] Bronze I": return `./assets/rocketleague/ranks/bronze/bronze2.png`;
            case "[III] Bronze I": case "[II] Bronze I": case "[I] Bronze I": return `./assets/rocketleague/ranks/bronze/bronze1.png`;
            /// Unranked
            case "[I] Unranked": return `./assets/rocketleague/ranks/unranked/unranked.png`;
        }
    }
    
};