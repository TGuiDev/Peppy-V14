const fs = require('fs');
require('colors')

module.exports = (client) => {
	const load = dirs =>{
		fs.readdirSync(`./Events/${dirs}/`).filter((file) => file.endsWith('.js')).forEach((event) => {
			require(`../Events/${dirs}/${event}`);
		})
	}
	["shop","ticket","guild","client"].forEach((x) => load(x));
	console.log('📢 | [ Eventos  ] ========= Status:'.white +' Ok'.green)
};