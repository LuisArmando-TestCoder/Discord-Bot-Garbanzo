const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord =  require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.channel.send('You cannot use this command because life bro')
    }

    const mentionedMember = message.mentions.members.first()
    let reason = args.slice(1).join(' ')

    if (!reason) reason = 'No reason given'

    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor('#ff4444')
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL())

    // -kick @user
    if (!args[0]) {
      return message.channel.send('You need to state a user to kick. "-kick @user reason"')
    }

    if (!mentionedMember) {
      return message.channel.send('The member mentioned is not in the server')
    }

    try {
      await mentionedMember.send(kickEmbed)
    } catch (error) {
      console.log('I was unable to message the member.')
    }

    try {
      await mentionedMember.kick(reason)
    } catch (error) {
      console.log(error)

      return message.channel.send('I was unable to kick the member mentioned.')
    }
  }
}