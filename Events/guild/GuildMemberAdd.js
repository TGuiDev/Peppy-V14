const client = require('../../index.js')
require('colors');

let dataAtual = new Date();
let dia = dataAtual.getDate();
let mes = (dataAtual.getMonth() + 1);
let ano = dataAtual.getFullYear();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
let segundos = dataAtual.getSeconds();


client.on('guildMemberAdd', async (interaction) => {

    console.log(`📤 |  O usuário `.white + `${interaction.user.tag} | ${interaction.user.id}`.blue + ` acaba de entrar no servidor `.white + `${interaction.guild.name} | ${interaction.guild.id}`.magenta +` as `.white +`${horas}:${minutos}:${segundos}`.red +` dia `.white + `${dia}/${mes}/${ano}`.red)

})