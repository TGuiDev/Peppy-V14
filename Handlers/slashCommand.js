const fs = require('fs');
require('chalk');
const config = require('../config/config.json');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')
require('dotenv').config()
require('colors')

const CLIENT_ID = config.Client_ID;

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

module.exports = (client) => {
	const slashCommands = [];

	fs.readdirSync('./SlashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./SlashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for (const file of files) {
			const slashCommand = require(`../SlashCommands/${dir}/${file}`);
			slashCommands.push({
				name: slashCommand.name,
				description: slashCommand.description,
				type: slashCommand.type,
				options: slashCommand.options ? slashCommand.options : null,
				default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
				default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null			});

			if (slashCommand.name) {
				client.slashCommands.set(slashCommand.name, slashCommand)
			}
		}
	});

	(async () => {
		try {
			await rest.put(
				config.Guild_ID ?
					Routes.applicationGuildCommands(CLIENT_ID, config.Guild_ID) :
					Routes.applicationCommands(CLIENT_ID),
				{ body: slashCommands }
			);
			console.log('⚙️  | [ Comandos ] ========= Status:'.white+' Ok'.green)
		} catch (error) {
			console.log(error);
		}
	})();
};