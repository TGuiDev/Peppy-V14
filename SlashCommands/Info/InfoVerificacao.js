const Discord = require('discord.js')
const sticker = require('../../config/sticker.json')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'info-cargo-verificado',
    description: "[ ⚙️ ] ",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {
            let verificado = await db.get("cargoVerificado.cargoV");
            let cargo = await db.get("cargoModerate.cargoM")
            interaction.reply({content: `${sticker.config} | O cargo de verificação atual é: <@&${verificado.id}>.`, ephemeral: true})
        }
    }
} 