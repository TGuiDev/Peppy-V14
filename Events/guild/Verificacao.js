const client = require("../../index");
const config = require('../../config/config.json');
const sticker = require('../../config/sticker.json');
const Discord = require('discord.js');
require('colors');

let dataAtual = new Date();
let dia = dataAtual.getDate();
let mes = (dataAtual.getMonth() + 1);
let ano = dataAtual.getFullYear();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
let segundos = dataAtual.getSeconds();

client.on('interactionCreate', interaction => {
    let cargo = interaction.guild.roles.cache.get(config.cargo_verificado); 
    if (interaction.isButton()) {
        if (interaction.customId.startsWith("verificar")) {
            try {
            if (interaction.member.roles.cache.get(cargo.id)) {
                interaction.reply({ content: `> ${sticker.nao} | Você já está verificado no servidor!`, ephemeral: true })
            } 
            else {

            interaction.member.roles.add(cargo)
    
            interaction.reply({ content: `> ${sticker.check} | Você foi verificado com sucesso!`, ephemeral: true })

            console.log(`✅ |  O usuário `.white + `${interaction.user.tag} | ${interaction.user.id}`.blue + ` se verificou em `.white + `${interaction.guild.name} | ${interaction.guild.id}`.magenta +` as `.white +`${horas}:${minutos}:${segundos}`.red +` dia `.white + `${dia}/${mes}/${ano}`.red)

            }
            } catch (er) { console.log(er) }
        }
    }
})