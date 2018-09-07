const {RichEmbed} = require('discord.js');
const minimist = require('minimist-string');

const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

const help = {
	name: 'poll',
	description: 'Poll starts a new poll.',
	usage: 'poll -q \'[question]\' -a \'[answer]\' -a \'[answer]\''
};

const getLetter = index => String.fromCodePoint(127462 + index); // 127462 is the decimal code of :regional_indicator_a:

class Poll extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'poll',
			help: `\`${
				config.DISCORD_PREFIX
			}poll -q '[question]' -a '[answer]' -a '[answer]'\` responds with a poll`,
			regex: new RegExp(`^${config.DISCORD_PREFIX}poll`)
		};
	}

	async handler(msg) {
		super.handler(msg);

		const m = minimist(this.args.join(' '), {
			string: ['q', 'question', 'a', 'answer']
		});

		const question = m.q || m.question;
		const answers = m.a || m.answer;

		if (!question || Array.isArray(question)) {
			return msg.reply('🚫 You must supply 1 question.');
		}
		if (!Array.isArray(answers) || answers.length < 2 || answers.length > 26) {
			return msg.reply('🚫 You must supply between 2 and 26 answers.');
		}
		let answerMsg = '';
		for (let i = 0; i < answers.length; i++) {
			answerMsg += `${getLetter(i)} ${answers[i]}\n`;
		}
		const embed = {
			title: question,
			color: 3447003,
			author: {
				name: 'CMYK',
				icon_url: 'https://d.pr/i/B8VFju.png'
			},
			fields: [
				{
					name: 'Answers:',
					value: answerMsg + '\n'
				}
			],
			timestamp: new Date()
		};
		try {
			console.log(embed);
			const e = new RichEmbed(embed);
			console.log(e);
			const response = await msg.channel.sendEmbed(new RichEmbed(embed));
			for (let i = 0; i < answers.length; i++) {
				await response.react(getLetter(i));
			}
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = Poll;
