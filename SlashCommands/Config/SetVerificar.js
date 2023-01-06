const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');
module.exports = {
  name: "set-verificar",
  description: "[ ⚙️ ].",
  ownerOnly: true,
  type: Discord.ApplicationCommandType.Channel,
  options: [
    {
        name: "canal",
        description: "Canal que vai ser enviado a embed",
        type: ApplicationCommandOptionType.Channel,
        required: true,
    },
  ],

  run: async (client, interaction) => {


        let verificar = new Discord.EmbedBuilder()
        .setTitle(`››› Sistema de verificação.`)
        .setColor("#40b272")
        .setDescription(`**${sticker.new} Olá!**, Bem-Vindo(a) ao **${interaction.guild.name}**\n\n*Para que você possa acessar a outras salas desse servidor, você precisará passar por um pequeno e simples registro, para verificar sua conta e receber a tag [ \<@&`+config.cargo_verificado+`> ]  apenas clique no botão abaixo.*\n\nLeia nossos <#1049170202228690964> antes de tudo!`)
        .setFooter({ text: client.user.username , iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setImage("https://imgur.com/QdvKTcD.png")
        .setTimestamp(new Date())

         const verificar_botao = new Discord.ActionRowBuilder()
             .addComponents(
                 new Discord.ButtonBuilder()
                 .setCustomId('verificar')
                 .setLabel('Verificar')
                 .setEmoji(`${sticker.check}`)
                 .setStyle(Discord.ButtonStyle.Success),
             );

        const canal = interaction.options.getChannel("canal");

        interaction.reply({ content: `✅ | **Mensagem enviada!**`, ephemeral: true })
        canal.send({  embeds: [verificar], components: [verificar_botao] })

  }
}