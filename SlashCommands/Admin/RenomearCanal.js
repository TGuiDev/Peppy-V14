const Discord = require("discord.js")
const sticker = require('../../config/sticker.json')

module.exports = {
    name: "renomear-canal",
    description: "[ 💼 ] Renomear o canal em que usar o comando!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome",
            description: "Qual sera o novo nome do canal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

run: async (client, interaction, args) => {
    
    let renamechannel = interaction.options.getString("nome");

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `${sticker.info} | Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
            .setTitle("Canal Renomeado")
            .setColor('#2f3136')
            .setDescription(`${sticker.config} | Esse canal foi renomeado para: \`\`\`${renamechannel}\`\`\``)

          const nomedocanal = interaction.options.getString("nome");
            interaction.reply({ embeds: [embed]}).then(() => {
                    interaction.channel.setName(`${nomedocanal}`);
            })
        }
    }
 }