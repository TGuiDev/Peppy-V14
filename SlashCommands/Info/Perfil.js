const Discord = require('discord.js')
const { ApplicationCommandType } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
    name: 'perfil', 
    description: "[ 🗂️ ]",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        await interaction.deferReply()
        
        const canvas = Canvas.createCanvas(850, 500);
        const editar = canvas.getContext('2d');
        
        const background = await Canvas.loadImage("https://imgur.com/8wYdEZV.png")
        editar.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'png', size: 128}))
        const layout = await Canvas.loadImage("https://imgur.com/MUb5XF8.png");

        editar.drawImage(avatar, 73, 87, 150, 150)
        editar.drawImage(layout, 0, 0, canvas.width, canvas.height);

        editar.textAlign = "left";
        editar.font = '30px Segoe UI Black';
        editar.fillStyle = "#211e21";
        editar.fillText(`${interaction.user.tag}`, 225, 128)

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), background);
        interaction.followUp({ content: `Este é o perfil de ${interaction.user} , precisa de algo mais?`, files: [attachment]});
    }
};
