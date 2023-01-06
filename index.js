// FUNÇÃO PARA REPL
// require("http").createServer((req, res) => res.end("Bot Iniciado com Sucesso!")).listen(8080);
const fs = require('fs');
const config = require('./config/config.json');
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.slashCommands = new Collection(); 
module.exports = client;

fs.readdirSync('./Handlers').forEach((handler) => {
    require(`./Handlers/${handler}`)(client)
});

// CONEXÃO DO BANCO DE DADOS //
// MONGOOSE
const mongo = require("mongoose");
client.userdb = require("./Database/user.js")

// QUICK.DB
const { QuickDB } = require('quick.db')
const db = new QuickDB;

// LOGIN BANCO DE DADOS
// MONGOOSE
require('dotenv').config();
client.MongoConnect = () => mongo.connect(process.env.MongoURL);
// LOGIN COM O TOKEN
client.login(process.env.TOKEN);

