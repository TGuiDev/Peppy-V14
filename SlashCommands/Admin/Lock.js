const Discord = require("discord.js")
const sticker = require('../../config/sticker.json')

module.exports = {
    name: "lock",
    description: "[ 💼 ] Trava o Canal Selecionado!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'canal',
            type: Discord.ApplicationCommandOptionType.Channel,
            description: 'Escolha o Canal que será Travado!',
            required: true,
        },
    ],
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply(`❌ Você não tem permissão para utilizar esse comando!`)
            
        } else {

                let channel = interaction.options.getChannel('canal')
                interaction.reply(`✔️ O(a) ${channel} foi trancado com sucesso!`).then(msg => {
                channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.editReply(`🩸 Reporte esse erro à um Administrador!`)
                })
            })
        }
    }    
}