const Discord = require('discord.js')
const sticker = require('../../config/sticker.json')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'set-cargo-verificado',
    description: "[ ⚙️ ] ",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cargo",
            description: "Escolha o cargo.",
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {
            
            let cargoV = interaction.options.getRole("cargo")


                await db.set('cargoVerificado', {cargoV})
          
                 interaction.reply({content: `${sticker.config} | O cargo ${cargoV} foi setado como cargo de verificação`, ephemeral: true})
            }
    }
} 