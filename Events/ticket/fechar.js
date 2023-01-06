const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const client = require("../../index");
const config = require('../../config/config.json');
const sticker = require('../../config/sticker.json');
const Discord = require('discord.js');
const { QuickDB } = require('quick.db') // QUICK.DB
const db = new QuickDB;;    //QUICK.DB
require('colors');

client.on("interactionCreate", async interaction => {
    const member = interaction.member
    const guild = interaction.guild
    if(interaction.isButton) {
        if(interaction.customId === "fechar") {
        const modalTicket = new ModalBuilder()
            .setCustomId('modal_ticket')
            .setTitle(`Fechar - Ticket`)
            const resposta1 = new TextInputBuilder()
            .setCustomId('resposta')
            .setLabel('Diga-nos a razão de fechar o ticket:')
            .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().addComponents(resposta1);
            modalTicket.addComponents(firstActionRow)
            await interaction.showModal(modalTicket);
        } else if(interaction.customId === "lock") {
            const cliente = interaction.guild.members.cache.get(
                interaction.channel.topic.slice(0, 18)
            );
            let cargoTicket2 = await db.get("cargoModerate.cargoM");          
                if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
                    interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
                } else {
                    interaction.channel.permissionOverwrites.edit(cliente.user, {
                        ViewChannel: false
                    })
                interaction.reply(`**🔐 - Canal trancado, permissão de visualizar canal fechada para ${cliente.user}!**`)

                }
        } else if(interaction.customId === "unlock") {

            const cliente = interaction.guild.members.cache.get(
                interaction.channel.topic.slice(0, 18)
            );

            let cargoTicket2 = await db.get("cargoModerate.cargoM");

            if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
                interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
            } else {
            interaction.channel.permissionOverwrites.edit(cliente.user, { ViewChannel: true} )
            interaction.reply(`**🔑 - 🔓 - Canal destrancado, permissão de visualizar canal concedida para ${cliente.user}!**`)
            }
        }
    };
});