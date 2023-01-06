const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')

module.exports = {
  name: "set-ticket", 
  description: '[ 🎫 ] Envie o painel de tikcet.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
],
  
    run: async(client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({
            content: `**${sticker.nao} - ${interaction.user}, Você precisa da permissão \`Administrador\` para usar este comando!**`,
            ephemeral: true,
      }); else {

        let chat = interaction.options.getChannel("chat")

        if (!chat.send)
        return interaction.reply({
            content: `**${sticker.nao} - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
            ephemeral: true,
        })

        const ticket = new Discord.ActionRowBuilder()
             .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('duvidas')
                .setLabel('Dúvidas')
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                 .setCustomId('orcamentos')
                 .setLabel('Orçamentos')
                 .setStyle(Discord.ButtonStyle.Success),
                 new Discord.ButtonBuilder()
                 .setCustomId('outros')
                 .setLabel('Outros')
                 .setStyle(Discord.ButtonStyle.Secondary),
             );
        // Sistema com Dropdown
        // let rowTicket = new Discord.ActionRowBuilder()
        // .addComponents(
        //     new Discord.SelectMenuBuilder()
        //         .setCustomId('select2')
        //         .setPlaceholder('🎫 - selecionar Opção!')
        //         .addOptions(
        //             {
        //                 label: ' - Ticket',
        //                 description: 'Clique aqui para abrir o Ticket (Denúncias e Suporte Geral).',
        //                 emoji: '🔨',
        //                 value: 'ticket',
        //             },
        //             {
        //                 label: ' - Tenho Dúvidas',
        //                 description: 'Clique aqui caso haja alguma dúvida.',
        //                 emoji: '❔',
        //                 value: 'duvida',
        //             },
                    
        //         ),
                
        //    )

          
        let embedTicket = new Discord.EmbedBuilder()
         .setTitle(`<:ticket:1052099836960317450> - Ticket`)
         .setDescription(`• Abra um ticket clicando no botão a baixo.\n\n• Não abra vários tickets, isso resultara em punição.\n• Caso não tenha motivos, não abra o ticket!`)
         .setColor('#2f3136')
         .setAuthor({ name: `${interaction.guild.name}`})
         .setTimestamp()
        //  .setFooter({ text: `Abra somente um ticket`})
        //  .setThumbnail(`${interaction.guild.iconURL()}`)
        //  .setImage(`${interaction.guild.iconURL({ size: 2048})}`)
         

         interaction.reply({ content: `✅ - Feito! Ticket enviado no canal ${chat}!`, ephemeral: true})
         chat.send({ components: [ticket], embeds: [embedTicket] })
      } 
  }
}