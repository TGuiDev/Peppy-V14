
const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');
module.exports = {
  name: "set-regras",
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
        .setTitle(` 📝 Regras`)
        .setColor("#2f3136")
        .setDescription(`
\📄 **| [Diretrizes da Comunidade](https://discord.com/guidelines)**
\🛠️ **| [Termos de serviços](https://discord.com/terms)**
`)

        let e2 = new Discord.EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`
・Não divulgue o servidor através de spam;
・Não utilize J4J (Troca de divulgação)
・Não convide contas alts para o servidor;
・Não faça autopromoção/divulgação;
・Após o produto ser entregue, não nos responsabilizamos mais pelo mesmo;
・Não entregamos o produto antes do pagamento, somente após;
・Só realizamos o reembolso caso o produto não seja entregue ao cliente;
`)

        const canal = interaction.options.getChannel("canal");

        interaction.reply({ content: `✅ | **Mensagem enviada!**`, ephemeral: true })
        canal.send({  embeds: [e1, e2]})
  }
}