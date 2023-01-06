const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const client = require('../../index.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB;
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');

module.exports = {
  name: "set-avaliar-staff",
  description: "[ ⚙️ ]",
  ownerOnly: true,
  type: Discord.ApplicationCommandType.Channel,
  options: [
    {
        name: "canal",
        description: "Canal que vai ser enviado a embed de avaliação",
        type: ApplicationCommandOptionType.Channel,
        required: true,
    },
  ],

  run: async (client, interaction) => {

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Avaliar Staff`)
        .setColor("#2f3136")
        .setDescription(`Clique no botão abaixo para abrir o modal de avaliação!`)

        const botao = new Discord.ActionRowBuilder()
             .addComponents(
                 new Discord.ButtonBuilder()
                 .setCustomId('avaliar-staff')
                 .setLabel('Avaliar')
                 .setEmoji(`⭐`)
                 .setStyle(Discord.ButtonStyle.Secondary),
             );

        const canal = interaction.options.getChannel("canal");

        interaction.reply({ content: `✅ | **Mensagem enviada!**`, ephemeral: true })
        canal.send({  embeds: [embed], components: [botao]})

    }
}