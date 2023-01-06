const sticker = require('../../config/sticker.json');
const Discord = require('discord.js');

module.exports = {
    name:'sticker',
    aliases: ['st' ],
    description:'Envia todos os stickers do bot',
    run: async(client, interaction, ) => {

        interaction.reply({content: `${sticker.nao}${sticker.check}${sticker.ticket}${sticker.config}${sticker.lixeira}${sticker.admin}${sticker.canal}${sticker.discord}${sticker.info}${sticker.new}${sticker.bot}${sticker.compass}${sticker.placa}${sticker.search}`})
    }
}