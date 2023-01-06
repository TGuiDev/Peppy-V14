const client = require('../../index');
const chalk = require('chalk');
const ms = require('ms');
require('colors');
client.on("ready", () => {


	const { user, ws } = client;
	setInterval(() => {
		const ping = ws.ping;
		user.setActivity({ name: `Ping: ${ping} ms`, type: 1, })
		// user.setActivity(`Albion Online`,{ type: 1, url: "https://twitch.tv/discord" });
	}, ms("5s"))

	console.log(`🤖 | [ Bot      ] ========= Status:`.white +` Online`.green)
	console.log(`=================== LOG ===================`)
});