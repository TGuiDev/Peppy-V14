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
    if (interaction.isButton()) {
        if (interaction.customId === "orcamentos") {
            if (interaction.guild.channels.cache.find(c => c.name === `orcamento-${member.id}`)) {
                let c = interaction.guild.channels.cache.find(c => c.name === `orcamento-${member.id}`);
                interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true })
            } else {
                let cargoTicket = await db.get("cargoModerate.cargoM");                         let CategoriaTicket = await db.get('Categoria.Categoria')                    
                guild.channels.create({
            
                name: `orcamento-${member.id}`,
                type: 0, 
                parent: `${CategoriaTicket.id}`,                         
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id: member.id,
                        allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                    },
                    {
                        id: cargoTicket.id, 
                        allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
                    }
                ]}).then( (ca) => {
                    interaction.reply({ content: `**<:ticket:1052099836960317450> - Ticket criado em <#${ca.id}>...**`, ephemeral: true })

                    let embedCanalTicket = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                    .setDescription(`*Fale, o que você precisa?*`)
                    .addFields(
                        {
                            name: '\`\`\`Denúncias - Modelo:\`\`\`',
                            value: `*Seu nome:*\n*Nome do Envolvido:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n*Provas:*\n`,
                            inline: false,
                        },
                        {
                            name: '\`\`\`Suporte Geral - Modelo:\`\`\`',
                            value: `*Seu nome:*\n*Motivo de abrir o Ticket:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n`,
                            inline: false,
                        },
                    )
                    .setTimestamp()


                    let FecharTicket = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setLabel(` - Fechar & Salvar`)
                        .setEmoji(`🔒`)
                        .setCustomId('fechar')
                        .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                        .setLabel(` - Lock`)
                        .setEmoji(`🔐`)
                        .setCustomId('lock')
                        .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                        .setLabel(` - Unlock`)
                        .setEmoji(`🔓`)
                        .setCustomId('unlock')
                        .setStyle(ButtonStyle.Success)
                    )                
                    
                    ca.send({ content: `${interaction.user}`,embeds: [embedCanalTicket], components: [FecharTicket] })
                })          
            }
        }
    } 
});