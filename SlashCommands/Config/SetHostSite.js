
const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const client = require('../../index.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB;
const sticker = require('../../config/sticker.json')
const config = require('../../config/config.json');
module.exports = {
  name: "set-host-sites",
  description: "[ ⚙️ ].",
  ownerOnly: true,
  type: Discord.ApplicationCommandType.Channel,
  options: [
    {
        name: "canal",
        description: "Canal que vai ser enviado a embed",
        type: ApplicationCommandOptionType.Channel,
        required: true,
    },
  ],

  run: async (client, interaction) => {


        let e1 = new Discord.EmbedBuilder()
        .setTitle(null)
        .setColor("#2f3136").addFields(
          {
              name: '<:nivel1:1055976455240171560> | Plano Nivel 1',
              value: `<:money:1052010149461635072> | **R$16,90 Mensal**\n\`\`\`\n • Hospede ate 1 Domínio\n • 20 GB de Disco\n • Subdomínios ilimitado\n • Certificado SSL grátis\`\`\``,
              inline: true,
          },
          {
              name: '<:nivel2:1055976453902184448> | Plano Nivel 2',
              value: `<:money:1052010149461635072> | **R$ 34,90/Mensal**\n\`\`\`\n • Hospede ate 2 Domínio\n • 40 GB de Disco\n • Subdomínios ilimitado\n • Certificado SSL grátis\`\`\``,
              inline: true,
          },
        )
        .setDescription(null)

        let e2 = new Discord.EmbedBuilder()
        .setTitle(null)
        .setColor("#2f3136").addFields(
          {
              name: '<:nivel3:1055976452463542362> | Plano Nivel 3',
              value: `<:money:1052010149461635072> | **R$ 49,90/Mensal**\n\`\`\`\n • Hospede ate 5 Domínio\n • 60 GB de Disco\n • Subdomínios ilimitado\n • Certificado SSL grátis\`\`\`\n`,
              inline: true,
          },
          {
              name: '<:nivel4:1055976450357985381> | Plano Nivel 4',
              value: `<:money:1052010149461635072> | **R$ 69,90/Mensal**\n\`\`\`\n • Hospede ate 10 Domínio\n • 70 GB de Disco\n • Subdomínios ilimitado\n • Certificado SSL grátis\`\`\`\n`,
              inline: true,
          },
        )
        .setDescription(null)

        const btn_comprar_1 = new Discord.ActionRowBuilder()
             .addComponents(
                 new Discord.ButtonBuilder()
                 .setCustomId('plano1')
                 .setLabel('Plano 1')
                 .setEmoji(`<:nivel1:1055976455240171560>`)
                 .setStyle(Discord.ButtonStyle.Success),
                 new Discord.ButtonBuilder()
                 .setCustomId('plano2')
                 .setLabel('Plano 2')
                 .setEmoji(`<:nivel2:1055976453902184448>`)
                 .setStyle(Discord.ButtonStyle.Success),
                 new Discord.ButtonBuilder()
                 .setCustomId('plano3')
                 .setLabel('Plano 3')
                 .setEmoji(`<:nivel3:1055976452463542362>`)
                 .setStyle(Discord.ButtonStyle.Success),
                 new Discord.ButtonBuilder()
                 .setCustomId('plano4')
                 .setLabel('Plano 4')
                 .setEmoji(`<:nivel4:1055976450357985381>`)
                 .setStyle(Discord.ButtonStyle.Success),
             );        

        const canal = interaction.options.getChannel("canal");

        interaction.reply({ content: `\✅ | **Mensagem enviada!**`, ephemeral: true })
        canal.send({  embeds: [e1, e2], components:  [btn_comprar_1] })
  }
}




client.on("interactionCreate", async interaction => {
  const member = interaction.member
  const guild = interaction.guild
  if (interaction.isButton()) {
    if (interaction.customId === "plano1") {
      if (interaction.guild.channels.cache.find(c => c.name === `pano-1-${member.id}`)) {
          let c = interaction.guild.channels.cache.find(c => c.name === `pano-1-${member.id}`);
          interaction.reply({ content: `Você já possui um ticket de compra aberto em ${c}.`, ephemeral: true })
      } else {

      let cargoTicket = await db.get("cargoModerate.cargoM");
      let CategoriaTicket = await db.get('Categoria.Categoria')
                   
      guild.channels.create({
                      
      name: `pano-1-${member.id}`,
      type: 0, 
      parent: `${CategoriaTicket.id}`,
      topic: interaction.user.id, 
      permissionOverwrites: [
          {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
          },
          {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
          },
         {
              id: cargoTicket.id, 
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
          }
      ]

                      }).then( (ca) => {
      interaction.reply({ content: `**<:nivel1:1055976455240171560> - Ticket de compra criado em <#${ca.id}>.**`, ephemeral: true })

       let embedCanalTicket = new Discord.EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`*Não mencione  a Staff, logo estaremos aqui para te ajudar!*`)
        .addFields(
          {
              name: `**Suporte para compra de:**`,
              value: `\`\`\`\nHost - Plano 1\`\`\``,
              inline: false,
          },
        )
        .setTimestamp()


        let FecharTicket = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setLabel(` - Fechar & Salvar`)
          .setEmoji(`🔒`)
          .setCustomId('fechar')
          .setStyle(Discord.ButtonStyle.Danger),
          new Discord.ButtonBuilder()
          .setLabel(` - Lock`)
          .setEmoji(`🔐`)
          .setCustomId('lock')
          .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
          .setLabel(` - Unlock`)
          .setEmoji(`🔓`)
          .setCustomId('unlock')
          .setStyle(Discord.ButtonStyle.Success)
        )                
          ca.send({ content: `${interaction.user}`,embeds: [embedCanalTicket], components: [FecharTicket] })
        })
      }            
    }
    if (interaction.customId === "plano2") {
      if (interaction.guild.channels.cache.find(c => c.name === `pano-2-${member.id}`)) {
          let c = interaction.guild.channels.cache.find(c => c.name === `pano-2-${member.id}`);
          interaction.reply({ content: `Você já possui um ticket de compra aberto em ${c}.`, ephemeral: true })
      } else {

      let cargoTicket = await db.get("cargoModerate.cargoM");
      let CategoriaTicket = await db.get('Categoria.Categoria')
                   
      guild.channels.create({
                      
      name: `pano-2-${member.id}`,
      type: 0, 
      parent: `${CategoriaTicket.id}`,
      topic: interaction.user.id, 
      permissionOverwrites: [
          {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
          },
          {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
          },
         {
              id: cargoTicket.id, 
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
          }
      ]

                      }).then( (ca) => {
      interaction.reply({ content: `**<:nivel2:1055976453902184448> - Ticket de compra criado em <#${ca.id}>.**`, ephemeral: true })

       let embedCanalTicket = new Discord.EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`*Não mencione  a Staff, logo estaremos aqui para te ajudar!*`)
        .addFields(
          {
              name: `**Suporte para compra de:**`,
              value: `\`\`\`\nHost - Plano 2\`\`\``,
              inline: false,
          },
        )
        .setTimestamp()


        let FecharTicket = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setLabel(` - Fechar & Salvar`)
          .setEmoji(`🔒`)
          .setCustomId('fechar')
          .setStyle(Discord.ButtonStyle.Danger),
          new Discord.ButtonBuilder()
          .setLabel(` - Lock`)
          .setEmoji(`🔐`)
          .setCustomId('lock')
          .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
          .setLabel(` - Unlock`)
          .setEmoji(`🔓`)
          .setCustomId('unlock')
          .setStyle(Discord.ButtonStyle.Success)
        )                
          ca.send({ content: `${interaction.user}`,embeds: [embedCanalTicket], components: [FecharTicket] })
        })
      }            
    }
    if (interaction.customId === "plano3") {
      if (interaction.guild.channels.cache.find(c => c.name === `pano-3-${member.id}`)) {
          let c = interaction.guild.channels.cache.find(c => c.name === `pano-3-${member.id}`);
          interaction.reply({ content: `Você já possui um ticket de compra aberto em ${c}.`, ephemeral: true })
      } else {

      let cargoTicket = await db.get("cargoModerate.cargoM");
      let CategoriaTicket = await db.get('Categoria.Categoria')
                   
      guild.channels.create({
                      
      name: `pano-3-${member.id}`,
      type: 0, 
      parent: `${CategoriaTicket.id}`,
      topic: interaction.user.id, 
      permissionOverwrites: [
          {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
          },
          {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
          },
         {
              id: cargoTicket.id, 
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
          }
      ]

                      }).then( (ca) => {
      interaction.reply({ content: `**<:nivel3:1055976452463542362> - Ticket de compra criado em <#${ca.id}>.**`, ephemeral: true })

       let embedCanalTicket = new Discord.EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`*Não mencione  a Staff, logo estaremos aqui para te ajudar!*`)
        .addFields(
          {
              name: `**Suporte para compra de:**`,
              value: `\`\`\`\nHost - Plano 3\`\`\``,
              inline: false,
          },
        )
        .setTimestamp()


        let FecharTicket = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setLabel(` - Fechar & Salvar`)
          .setEmoji(`🔒`)
          .setCustomId('fechar')
          .setStyle(Discord.ButtonStyle.Danger),
          new Discord.ButtonBuilder()
          .setLabel(` - Lock`)
          .setEmoji(`🔐`)
          .setCustomId('lock')
          .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
          .setLabel(` - Unlock`)
          .setEmoji(`🔓`)
          .setCustomId('unlock')
          .setStyle(Discord.ButtonStyle.Success)
        )                
          ca.send({ content: `${interaction.user}`,embeds: [embedCanalTicket], components: [FecharTicket] })
        })
      }            
    }
    if (interaction.customId === "plano4") {
      if (interaction.guild.channels.cache.find(c => c.name === `pano-4-${member.id}`)) {
          let c = interaction.guild.channels.cache.find(c => c.name === `pano-4-${member.id}`);
          interaction.reply({ content: `Você já possui um ticket de compra aberto em ${c}.`, ephemeral: true })
      } else {

      let cargoTicket = await db.get("cargoModerate.cargoM");
      let CategoriaTicket = await db.get('Categoria.Categoria')
                   
      guild.channels.create({
                      
      name: `pano-4-${member.id}`,
      type: 0, 
      parent: `${CategoriaTicket.id}`,
      topic: interaction.user.id, 
      permissionOverwrites: [
          {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
          },
          {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
          },
         {
              id: cargoTicket.id, 
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
          }
      ]

                      }).then( (ca) => {
      interaction.reply({ content: `**<:nivel4:1055976450357985381> - Ticket de compra criado em <#${ca.id}>.**`, ephemeral: true })

       let embedCanalTicket = new Discord.EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`*Não mencione  a Staff, logo estaremos aqui para te ajudar!*`)
        .addFields(
          {
              name: `**Suporte para compra de:**`,
              value: `\`\`\`\nHost - Plano 4\`\`\``,
              inline: false,
          },
        )
        .setTimestamp()


        let FecharTicket = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setLabel(` - Fechar & Salvar`)
          .setEmoji(`🔒`)
          .setCustomId('fechar')
          .setStyle(Discord.ButtonStyle.Danger),
          new Discord.ButtonBuilder()
          .setLabel(` - Lock`)
          .setEmoji(`🔐`)
          .setCustomId('lock')
          .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
          .setLabel(` - Unlock`)
          .setEmoji(`🔓`)
          .setCustomId('unlock')
          .setStyle(Discord.ButtonStyle.Success)
        )                
          ca.send({ content: `${interaction.user}`,embeds: [embedCanalTicket], components: [FecharTicket] })
        })
      }            
    }
  }
})