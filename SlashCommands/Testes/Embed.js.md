const Discord = require("discord.js")
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');

module.exports = {
  name: "embed",
  description: "[ 🏴 ] Envia uma embed para o canal",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
      {
        name: "título",
        description: "Escreva o titulo da embed",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "descrição",
        description: "Escreva a descrição da embed",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "cor",
        description: "Escreva a cor da embed",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
      },
  ],
  run: async (client, interaction) => {
           if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: `> **${sticker.nao} | Você não possui permissão para utilizar esse comando, caso fica tentando você sera punido do servidor.**`,
                ephemeral: true,
            })
        } else {
  let titulo = interaction.options.getString("título")
  let desc =  interaction.options.getString("descrição")
  let cor =  interaction.options.getString("cor")
        
   let embed =  new Discord.EmbedBuilder()
   .setTitle(titulo)
   .setDescription(desc)
   .setColor('cor');

   interaction.reply({ embeds: [embed]})
    }
  }
}