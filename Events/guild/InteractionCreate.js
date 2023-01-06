const client = require("../../index");
const config = require('../../config/config.json');
const sticker = require('../../config/sticker.json');
const Discord = require('discord.js');
require('colors');

client.on("interactionCreate", async (interaction, member) => {
  if (interaction.isCommand()) {

    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.EmbedBuilder()
    .setColor('#2f3136')
    .setTitle(`Comando utilizado`)
    .setDescription(null)
    .addFields(
      {
          name: `${sticker.info} **| Usuário**`,
          value: `\`\`\`${interaction.user.tag} | ${interaction.user.id} \`\`\``,
          inline: false,
      },
      {
          name: `${sticker.config} **| Comando**`,
          value: `\`\`\`${interaction.commandName}\`\`\``,
          inline: false,
      },
      {
          name: `${sticker.discord} **| Servidor**`,
          value: `\`\`\`${interaction.guild.name}\`\`\``,
          inline: false,
      },
    )
    .setTimestamp()
    
    logChannel.send({ embeds: [ embed ] })

    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = (dataAtual.getMonth() + 1);
    let ano = dataAtual.getFullYear();
    let horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();
    let segundos = dataAtual.getSeconds();

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Ocorreu algum erro amigo.`);
    
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      // cmd.run(client, interaction)
    console.log(`📄 | O comando `.white +`/${interaction.commandName}`.yellow +` foi utilizado por `.white +`${interaction.user.tag}`.green +` em `.white + `${interaction.guild.name}`.magenta +` as `.white +`${horas}:${minutos}:${segundos}`.red +` dia `.white + `${dia}/${mes}/${ano}`.red)
  }

});
