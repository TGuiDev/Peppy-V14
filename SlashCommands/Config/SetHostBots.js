
const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');
module.exports = {
  name: "set-host-bots",
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


        let e1 = new Discord.EmbedBuilder()
        .setTitle(`Host BOT's`)
        .setColor("#1E90FF")
        .setDescription(`
<:memory:1055972656429666344> | 512 MB = R$2,00/mensal
<:memory:1055972656429666344> | 1 GB = R$4,00/mensal
<:memory:1055972656429666344> | 2 GB = R$6,00/mensal
<:memory:1055972656429666344> | 4 GB = R$8,00/mensal
<:memory:1055972656429666344> | 6 GB = R$10,00/mensal
<:memory:1055972656429666344> | 8 GB = R$12,00/mensal
        `)

        const canal = interaction.options.getChannel("canal");

        interaction.reply({ content: `✅ | **Mensagem enviada!**`, ephemeral: true })
        canal.send({  embeds: [e1, e2]})
  }
}