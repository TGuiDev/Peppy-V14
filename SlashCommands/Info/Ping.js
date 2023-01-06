const { ApplicationCommandType } = require('discord.js');
const sticker = require('../../config/sticker.json')

module.exports = {
	name: 'ping',
	description: "[ 🚩 ] Exibe a veocidade de resposta do bot.",
	type: ApplicationCommandType.ChatInput,
	
	run: async (client, interaction) => {
		interaction.reply({ content: `🏓 | **Pong!**\n${sticker.bot} | **Websocket:** \`${Math.round(client.ws.ping)}ms\`\n${sticker.config} | **Mensagem:** \`${(Date.now() - interaction.createdTimestamp) / 5**(1)}ms\`` })
	}
};