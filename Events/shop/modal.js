const Discord = require('discord.js');
const client = require("../../index");

client.on("interactionCreate", async interaction => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith("avaliar-staff")){
            const modalAval = new Discord.ModalBuilder()
            .setCustomId('modal_sugestao')
            .setTitle(`⭐ Avaliação`)

            const Avaliacao = new Discord.TextInputBuilder()
            .setCustomId('avaliado')
            .setLabel('Quem te deu suporte?')
            .setPlaceholder(`Olá ${interaction.user.username}, nos informe quem lhe atendeu.`)
            .setStyle(Discord.TextInputStyle.Short)
            
            const Nota = new Discord.TextInputBuilder()
            .setCustomId('nota')
            .setLabel('Qual a nota de avaliação?')
            .setPlaceholder(`Ex: 9/10`)
            .setStyle(Discord.TextInputStyle.Short)

            const MensagemAvaliacao = new Discord.TextInputBuilder()
            .setCustomId('mensagem_avaliado')
            .setLabel('Comentário')
            .setPlaceholder("Como foi o atendimento?")
            .setStyle(Discord.TextInputStyle.Paragraph)
            
            const firstActionRow = new Discord.ActionRowBuilder().addComponents(Avaliacao);
            const nota = new Discord.ActionRowBuilder().addComponents(Nota);
            const secondActionRow = new Discord.ActionRowBuilder().addComponents(MensagemAvaliacao);

            modalAval.addComponents(firstActionRow, nota, secondActionRow)
            await interaction.showModal(modalAval);
        }
    }

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'modal_sugestao') {
        let canalModel = "1049573185391165493"; // Coloque o ID do canal
        let channelModal = client.channels.cache.get(canalModel)

        const AvaliadoModal = interaction.fields.getTextInputValue('avaliado');
        const Nota = interaction.fields.getTextInputValue('nota');
        const mensagemModal = interaction.fields.getTextInputValue('mensagem_avaliado');

        interaction.reply({
            content: `Olá ${interaction.user}, sua avaliação foi enviada com sucesso!`, 
            ephemeral: true
        });

        channelModal.send({ 
            embeds: [
                new Discord.EmbedBuilder()
                .setColor('#2f3136')
                .setAuthor({ name: `⭐ Avaliação de Staff`})
                .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true }))
                .setDescription(`O membro ${interaction.user} avaliou o atendimento de ${AvaliadoModal}.\n\n**Staff Avaliado:**\n\`\`\`${AvaliadoModal}\`\`\`\n**Nota:**\`\`\`\n${Nota}\`\`\`\n**Comentário:**\n\`\`\`${mensagemModal}\`\`\``)
                .setTimestamp()
            ]
        });
    }
})