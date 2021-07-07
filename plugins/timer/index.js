const ms = require('ms');
const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Timer extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'timer',
			help: `\`${config.DISCORD_PREFIX}timer 5m [your message here]\` pings the channel when the timer is up`,
			regex: new RegExp(`^${this.escapeRegex(config.DISCORD_PREFIX)}timer`),
			react: true
		};
	}

	async handler(msg) {
		super.handler(msg);
		const [duration, ...message] = this.args;

		if (!duration) {
			msg.author.send('You need to supply a duration. Format defined here: https://github.com/zeit/ms#examples');
		}

		const durationMs = ms(duration, {long: true});

		if (!durationMs) {
			msg.author.send('Duration in invalid format.');
		}

		setTimeout(async () => {
			try {
				if (message.length <= 0) {
					await msg.reply(`Your timer for ${ms(durationMs, {long: true})} is up!`, {reply: msg.author});
				} else {
					await msg.reply(`Your timer for ${ms(durationMs, {long: true})} is up!\n\n\`${message.join(' ')}\``, {reply: msg.author});
				}
			} catch (error) {
				console.log(error);
			}
		}, durationMs);
	}
}

module.exports = Timer;
