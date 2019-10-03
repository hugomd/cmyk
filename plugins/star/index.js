const cache = require('memory-cache');
const {RichEmbed} = require('discord.js');
const isImage = require('is-image');
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
		client.on('messageReactionAdd', messageReaction => {
			const {message, emoji: {name}} = messageReaction;
			const attachment = message.attachments.first();
			const {id} = message;
			if (cache.get(id)) {
				return;
			}

			if (!message.guild) {
				return;
			}

			if (message.author.bot) {
				return;
			}

			const starboard = message.guild.channels.filter(channel => channel.type === 'text').find(channel => channel.name === 'starboard');
			if (!starboard) {
				return;
			}

			if (name === '⭐') {
				const channelId = message.channel.id;
				const guildId = message.guild.id;
				cache.put(id, true);
				const embed = {
					color: 16207469,
					thumbnail: {
						url: message.author.avatarURL
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
							value: `[Jump To](https://discordapp.com/channels/${guildId}/${channelId}/${id})`,
							inline: true
						},
						{
							name: 'Starred by',
							value: messageReaction.users.first().toString(),
							inline: true
						}
					],
					timestamp: new Date()
				};

				if (attachment && isImage(attachment.filename)) {
					embed.image = {
						url: attachment.url
					};
				}

				starboard.send(new RichEmbed(embed));
			}
		});
	}
}

module.exports = Star;
