const Discord = require('discord.js')
const sticker = require('../../config/sticker.json')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'info-ticket',
    description: "[ 🎫 ] SMostra informações sobre o sistema de ticket.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
         } else {
            
            let categoria = await db.get('Categoria.Categoria')
            let cargo = await db.get("cargoModerate.cargoM")
                  
            let embed = new Discord.EmbedBuilder()
                .setColor('#2f3136')
                .setTitle('Informações do sistema de Ticket')
                .setDescription("Informações:")
                .addFields(
                    {
                        name: '\`\`\`Categoria\`\`\`',
                        value: `ID: ${categoria.id} | Nome: ${categoria.name}`,
                        inline: false,
                    },
                    {
                        name: '\`\`\`Cargo Staff\`\`\`',
                        value: `ID: ${cargo.id} | <@&${cargo.id}>`,
                        inline: false,
                    },
                )

            interaction.reply({ embeds: [embed]})
                
        }
    }
} 