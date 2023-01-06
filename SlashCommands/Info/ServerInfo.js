const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')

module.exports = {
    name: "server-info",
    description: "[ 🚩 ] Veja as informações do servidor",
    type: Discord.ApplicationCommandOptionType.ChatInput,
    // options: [
    //     {
    //         name: "id",
    //         description: "Cole o ID do servidor",
    //         type: Discord.ApplicationCommandOptionType.String,
    //         require: true,
    //     }
    // ],
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.guild.id;
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("#2f3136")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor: ${interaction.guild}`)
            .addFields(
                {
                    name: `${sticker.check} Identidade`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `${sticker.canal} Canais em geral:`,
                    value: `${sticker.canal} Canais: ${canais}\n${sticker.new} Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `${sticker.new} Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `${sticker.compass} Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `${sticker.config} ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `${sticker.compass} Dono`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
        )
        
        
        
        
        interaction.reply({ embeds: [ryan] })
    }
}