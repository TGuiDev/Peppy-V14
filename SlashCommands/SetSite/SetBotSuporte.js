const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
const sticker = require('../../config/sticker.json')
const client = require('../../index.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB;;

module.exports = {
  name: "set-website",
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
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
      let embed = new Discord.EmbedBuilder()
      .setTitle(null)
      .setColor("#2f3036")
      .setAuthor({ name: "Gui.Dev - Store", iconURL: `https://imgur.com/u0C9Nhv.png` }) 
      // .setImage('https://imgur.com/QKpFgpH.png')
//      .setDescription(`<:money:1052010149461635072> \`Valor:\` **R$ 15,00**\n<:host:1052010147871981608> \`Host:\` **<#1049170208453054484>**\n<:script:1052010146160721940> \`Código:\` **Sim**`)
      .setDescription(null)
      .addFields(
        {
            name: '<:money:1052010149461635072> **| PREÇO**',
            value: `\`\`\`\nVaria com a quantidade de  páginas\`\`\``,
            inline: false,
        },
        {
          name: `<:pasta:1052356833328775218> **| ARQUIVOS**`,
          value: `\`\`\`Sim\`\`\``,
          inline: true,
        },
        {
          name: `<:manutencao:1052356831839797328> **| MANUTENÇÃO**`,
          value: `\`\`\`Não\`\`\``,
          inline: true,
        },
        {
          name: `<:javascript:1052350891841298452> **| LINGUAGEM**`,
          value: `\`\`\`PHP, HTML, CSS & Js\`\`\``,
          inline: true,
        },
        {
            name: `<:devices:1055764539674734662> **| RESPONSIVIDADE**`,
            value: `\`\`\`Acréscimo de R$ 20,00 por página\`\`\``,
            inline: true,
          },
      )
      .setTimestamp(new Date())

      const comprarsitesimples = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('comprarsitesimples')
            .setLabel('Comprar')
            .setEmoji('<:money:1052010149461635072>')
            .setStyle(Discord.ButtonStyle.Success),
            new Discord.ButtonBuilder()
            .setCustomId('exemplossite')
            .setLabel('Exemplos')
            .setEmoji('<:lupa:1055767076352045116>')
            .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setLabel('Host')
            .setEmoji('<:host:1052010147871981608>')
            .setStyle(Discord.ButtonStyle.Link)
            .setURL('https://discord.com/channels/688630868641841165/1049170208453054484')
        );

      const canal = interaction.options.getChannel("canal");

      interaction.reply({ content: `✅ | **Mensagem enviada!**`, ephemeral: true })
      canal.send({  embeds: [embed], components: [comprarsitesimples] })

    }
  }
}



client.on("interactionCreate", async interaction => {
  const member = interaction.member
  const guild = interaction.guild
  if (interaction.isButton()) {
    if (interaction.customId === "exemplossite") {

      let embedCanalTicket = new Discord.EmbedBuilder()
       .setColor('#2f3136')
       .setDescription(`[Visitar Site](https://cidade.centralrp.repl.co/)`)
       .setImage('https://imgur.com/NAdvknq.png')
      let embedCanalTicket2 = new Discord.EmbedBuilder()
       .setColor('#2f3136')
       .setDescription(`[Visitar Site](https://jujuba.website/)`)
       .setImage('https://imgur.com/dLlnzZD.png')
      let embedCanalTicket3 = new Discord.EmbedBuilder()
       .setColor('#2f3136')
       .setDescription(`[Visitar Site](https://peppystore.guirosaah.repl.co/)`)
       .setImage('https://imgur.com/0b0uZsM.png')

       interaction.reply({embeds: [embedCanalTicket,  embedCanalTicket2, embedCanalTicket3], ephemeral: true})
    }
    
    
    if (interaction.customId === "comprarsitesimples") {
      if (interaction.guild.channels.cache.find(c => c.name === `site--${member.id}`)) {
          let c = interaction.guild.channels.cache.find(c => c.name === `site--${member.id}`);
          interaction.reply({ content: `Você já possui um ticket de compra aberto em ${c}.`, ephemeral: true })
      } else {

      let cargoTicket = await db.get("cargoModerate.cargoM");
      let CategoriaTicket = await db.get('Categoria.Categoria')
                   
      guild.channels.create({
                      
      name: `site--${member.id}`,
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
      interaction.reply({ content: `**<:ticket:1052099836960317450> - Ticket de compra criado em <#${ca.id}>.**`, ephemeral: true })

       let embedCanalTicket = new Discord.EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`*Não mencione  a Staff, logo estaremos aqui para te ajudar!*`)
        .addFields(
          {
              name: `**Suporte para compra de:**`,
              value: `\`\`\`\nWebSite\`\`\``,
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
