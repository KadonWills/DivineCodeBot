const botconfig = require('./botconfig.json')
const Discord = require('discord.js')
const {
    promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({
    provider: new EnmapLevel({
        name: "settings"
    })
}); // Enmap for settings
client.currency = new Enmap({
    provider: new EnmapLevel({
        name: "currency"
    })
}); // Enmap for currency

let xep = require('./xp.json')

const bot = new Discord.Client({
    disableEveryone: true
})

let countMsg = 0

let greetings = [
    'Hello',
    'Hi',
    'ni hao',
    'Hey',
    'Holla',
    "What's up?",
    "How's life",
    "How's your day",
    'Salut',
    "How's everything"
]

try {
    bot.on('ready', async () => {
        console.log(`${bot.user.username} is online`)
        bot.user.setActivity(' Divine Mission  (+)')

        bot
            .generateInvite(['ADMINISTRATOR'])
            .then(link => {
                console.log(link)
            })
            .catch(err => {
                console.log(err.stack)
            })



        await bot.generateInvite(['ADMINISTRATOR'])

        bot.on('message', async message => {
            countMsg++

            if (message.author.bot) return

            if (message.channel.type === 'dm') return

            const prefix = botconfig.prefix
            let messageArray = message.content.split(' ')
            let cmd = messageArray[0]
            let arg = messageArray.slice(1)



            if (!cmd.startsWith(prefix)) return



            if ((cmd === `${prefix}greet`) && arg != []) {
                console.log(arg)
                let current_greet = Math.floor(Math.random() * greetings.length)
                let greet = greetings[current_greet]
                return message.channel.send(`${greet} ${arg.join(' ')} !`)
            }

            if (cmd === `${prefix}`) {
                let
            }


            if (cmd === `${prefix}erm`) {
                return message.channel.send(`Kadon Love Merveille!`)
            }

            if (cmd === `${prefix}userinfo`) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username)
                    .setDescription("This is the user's info !")
                    .setColor('#7700FF')
                    .addField(
                        'Full username',
                        `${message.author.username} #${message.author.discriminator}`
                    )
                    .addField('ID', `${message.author.id}`)
                    .addField('Created At', `${message.author.createdAt}`)
                message.channel.send(embed)
            }
        })



        bot.on('guildCreate', guild => {
            // This event triggers when the bot joins a guild.
            console.log(
                `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${
          guild.memberCount
        } members!`
            )
            bot.user.setActivity(`Serving ${client.guilds.size} servers`)
        })

        bot.on('guildDelete', guild => {
            // this event triggers when the bot is removed from a guild.
            console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
            return message.channel
                .send(`${greet} ${arg.join(' ')} !`)
                .user.setActivity(`Serving ${client.guilds.size} servers`)
        })
    })
} catch (error) {
    return console.log(error)
}

bot.login(botconfig.token)