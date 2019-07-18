const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

let rolesmsg = [];
let index = 0;
rolesmsg[index] = "";
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roles',
            permissionLevel: 9,
            runIn: ['text'],
            description: 'Display all guild roles.',
        });
    }

    async run(msg, [channel = msg.channel, ...message]) {

        const display = new RichDisplay(new MessageEmbed().setColor(0x673AB7));

        msg.guild.roles.array().forEach(role => {
            rolesmsg[index] += `**${role.name}** (__**${role.id}**__) \n`;
            for (let i = role.name.length; i < 25; i++) {
                rolesmsg[index] += "";
            }
            if (rolesmsg[index].length > 1500) {
                index++;
                rolesmsg[index] = "";
            }
        });

        for (let i = 0; i < rolesmsg.length; i++) {
            display.addPage(template => template.setDescription(rolesmsg[i]));
        }

        return display.run(await msg.send('Loading Roles...'));
    }
};