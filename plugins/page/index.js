const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Ping extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'page',
			help: `\`${config.DISCORD_PREFIX}page\` is a test for pagination with reactions`,
			regex: new RegExp(`^${config.DISCORD_PREFIX}page`)
		};
	}
	async handler(msg) {
		super.handler(msg);
    const pageContent = [
      'Page 1',
      'Page 2',
      'Page 3',
      'Page 4'
		];
		if (msg.channel) {
			msg.channel
				.send(pageContent[0])
				.then(async sentMsg => {
					const setupReactions = async (r) => {
						if (r) {
							r.users.filter(user => !user.bot).map(async user => {
								if (!user.bot) {
									await r.remove(user);
								}
							});
						}
						await sentMsg.react('⏮');
						await sentMsg.react('⏭');
					};
					await setupReactions();
					let currentPage = 0;
					const collector = sentMsg.createReactionCollector((reaction, user) => {
						return !user.bot;
					});
					collector.on('collect', async r => {
						if (r.emoji.name === '⏮') {
							sentMsg.edit(pageContent[currentPage - 1]);
							currentPage--;
						}
						if (r.emoji.name === '⏭') {
							sentMsg.edit(pageContent[currentPage + 1]);
							currentPage++;
						}
						await setupReactions(r);
					});
				});
		}
	}

	config() {
		return this.conf;
	}
}

module.exports = Ping;
