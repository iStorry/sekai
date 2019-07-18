const { Client } = require('klasa');

require('dotenv').config();

Client.defaultPermissionLevels
     /*
     * Optionally you can pass a number to set a custom number of permission levels.
     * It is not advised however, as internal commands expect 10 to be the highest permission level.
     * Modifying away from 10 without further modification of all core commands,
     * could put your server at risk of malicious users using the core eval command.
     */

    // everyone can use these commands
    .add(0, () => true)
    // disable everyone
    .add(1, () => false)
    // Members of guilds must have 'ADMINISTRATOR' permission
    .add(2, ({ guild, member }) => guild && member.permissions.has('ADMINISTRATOR'), { fetch: true })
    // The member using this command must be the guild owner
    .add(3, ({ guild, member }) => guild && member === guild.owner, { fetch: true })
    /*
     * Allows the Bot Owner to use any lower commands
     * and causes any command with a permission level 9 or lower to return an error if no check passes.
     */
    .add(9, ({ author, client }) => author === client.owner, { break: true })
    // Allows the bot owner to use Bot Owner only commands, which silently fail for other users.
    .add(10, ({ author, client }) => author === client.owner)

Client.defaultGuildSchema
    .add('channels', folder => folder
        .add('modlog', 'TextChannel')
        .add('announcementChannel', 'TextChannel'))
    .add('roles', folder => folder
        .add('announcementRole', 'Role')
    .add('antiinvite', 'boolean', { default: false }))
    .add('modlogs', 'any', { array: true })
    // Custom Commands
    .add("customcmds", "any", { array: true, configurable: false })
    // Toggles
    .add("toggles", folder => folder
        .add("joinmsg", "boolean", { default: true })
        .add("leavemsg", "boolean", { default: true })
        .add("autoroles", "boolean", { default: true })
        .add("perspective", "boolean", { default: true })
        .add("customcmds", "boolean", { default: true })
        .add("starboard", "boolean", { default: true })
        .add("levelroles", "boolean", { default: true })
        .add("modlogs", "boolean", { default: true })
        .add("djmode", "boolean", { default: false })
        .add("levelup", "boolean", { default: false })
        .add("staffbypass", "boolean", { default: true })
        .add("selfroles", "boolean", { default: true }));    
new Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: "..",
    cmdEditing: true,
    typing: true,
    commandLogging: true,
    noPrefixDM: true,
    console: { useColor: true, utc: true },
    presence: { activity: { name: '.help', type: 'LISTENING' } },
    regexPrefix: /^(hey )?meow(,|!)/i,
    production: process.env.DEBUG,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
    
}).login(process.env.TOKEN);
