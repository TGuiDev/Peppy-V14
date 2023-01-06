const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const client = require("../../index");
const config = require('../../config/config.json');
const sticker = require('../../config/sticker.json');
const Discord = require('discord.js');
const { QuickDB } = require('quick.db') // QUICK.DB
const db = new QuickDB;;    //QUICK.DB
require('colors');
const discordTranscripts = require('discord-html-transcripts');


client.on("interactionCreate", async interaction => {
    const member = interaction.member
    const guild = interaction.guild

    
if (!interaction.isModalSubmit()) return;
if (interaction.customId === 'modal_ticket') {         
    const respostaFinal = interaction.fields.getTextInputValue('resposta');

    interaction.reply({
    content: `**<:7382discordsettings:1049547553378680832> - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
    }).then ( (aviso) => {
            setTimeout( () => {
                interaction.editReply({
                    content: `**<:7382discordsettings:1049547553378680832> - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
                }, 1000).then ( (aviso1) => {
                    setTimeout( () => {
                        interaction.editReply({
                            content: `**<:7382discordsettings:1049547553378680832> - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
                        })
                    }, 1000);
                })
                .then( () => {
                    setTimeout(async () => {
                        const cliente = interaction.guild.members.cache.get(
                            interaction.channel.topic.slice(0, 18)
                        );

                        let channel = interaction.channel;
                        const  attachment = await discordTranscripts.createTranscript(channel, {
                            fileName: `${channel.name}.html`,
                        });
                        
                        interaction.channel.delete();
                        const channelDeleted = interaction.channel.name;

                        let embedLog = new EmbedBuilder()
                        
                        .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                        .setColor('#2f3136')
                        .setTitle(`${channelDeleted}`)
                        .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                        .addFields(
                            {
                                name: `🆔 - ID de quem fechou:`,
                                value: `\`\`\`${interaction.user.id}\`\`\``,
                                inline: true,
                            },
                            {
                                name: `🆔 - ID de quem abriu:`,
                                value: `\`\`\`${cliente.id}\`\`\``,
                                inline: true,
                            },
                            {
                                name: `💬 - Quem fechou:`,
                                value: `${interaction.user}`,
                                inline: false,
                            },
                            {
                                name: `💬 - Quem abriu:`,
                                value: `${cliente.user}`,
                                inline: false,
                            },
                            {
                                name: `🎫 - Ticket:`,
                                value: `${channelDeleted}`,
                                inline: true,
                            },
                            {
                                name: '📕 - Motivo do Fechamento:',
                                value: `\`\`\`${respostaFinal}\`\`\``,
                                inline: false,
                            },
                        )
                        .setTimestamp()
                        .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                        .setThumbnail(`${cliente.user.displayAvatarURL()}`)

                        let embedLogUser = new EmbedBuilder()
                        
                        .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                        .setColor('#2f3136')
                        .setTitle(`Ticket Fechado!`)
                        .setDescription(`!`)
                        .addFields(
                            {
                                name: `💬 - Quem fechou:`,
                                value: `${interaction.user}`,
                                inline: false,
                            },
                            {
                                name: `💬 - Quem abriu:`,
                                value: `${cliente.user}`,
                                inline: false,
                            },
                            {
                                name: '📕 - Motivo do Fechamento:',
                                value: `\`\`\`${respostaFinal}\`\`\``,
                                inline: false,
                            },
                        )
                        .setTimestamp()
                        .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                        .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                        cliente.user.send({ embeds: [embedLogUser] })
                        await  interaction.guild.channels.cache.get(`${config.log_ticket}`).send({ content: `\`💾 - Transcript ⤵\``, files: [attachment] ,embeds: [embedLog] })
                    }, 1000);
                });
            });
        });
    };
});

