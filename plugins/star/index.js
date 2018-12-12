const cache = require('memory-cache');
const {RichEmbed} = require('discord.js')
const {logError} = require('../../utils/logger');
const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Star extends BasePlugin {
  constructor() {
    super();
    this.conf = {
      name: 'star',
      help: 'React with a star to add something to the starboard',
      regex: {
        test: () => false
      }
    };
  }

  register(client) {
    client.on('messageReactionAdd', (messageReaction, user) => {
      const {message, emoji: {name}} = messageReaction
      const {id} = message;
      if (cache.get(id)) return
      if (!message.guild) return
      if (message.author.bot) return

      const starboard = message.guild.channels.filter(channel => channel.type === 'text').find(channel => channel.name === 'starboard')
      if (!starboard) return

      if (messageReaction.emoji.name === '⭐') {
        const channelId = message.channel.id
        const guildId = message.guild.id
        cache.put(id)
        starboard.send(new RichEmbed({
          thumbnail: {
            url: message.author.avatarURL,
          },
          fields: [
            {
              name: 'Author',
              value: message.author.toString(),
              inline: true
            },
            {
              name: 'Channel',
              value: message.channel.toString(),
              inline: true
            },
            {
              name: 'Message',
              value: message.content
            },
            {
              name: 'Link',
              value: `[Jump To](https://discordapp.com/channels/${guildId}/${channelId}/${id})`
            }
          ],
          timestamp: new Date()
        }))
      }
    })
  }
}

module.exports = Star;
