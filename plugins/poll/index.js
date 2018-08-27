const {RichEmbed} = require('discord.js');
const minimist = require('minimist-string');

const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

const help = {
	name: 'poll',
	description: 'Poll starts a new poll.',
	usage: 'poll -q \'[question]\' -a \'[answer]\' -a \'[answer]\''
};

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

		const numToString = {
			0: ':zero:',
			1: ':one:',
			2: ':two:',
			3: ':three:',
			4: ':four:',
			5: ':five:',
			6: ':six:',
			7: ':seven:',
			8: ':eight:',
			9: ':nine:'
		};

		const numToEmoji = {
			0: '0⃣',
			1: '1⃣',
			2: '2⃣',
			3: '3⃣',
			4: '4⃣',
			5: '5⃣',
			6: '6⃣',
			7: '7⃣',
			8: '8⃣',
			9: '9⃣'
		};

		const m = minimist(this.args.join(' '), {
			string: ['q', 'question', 'a', 'answer']
		});

		const question = m.q || m.question;
		const answers = m.a || m.answer;

		if (!question || Array.isArray(question)) {
			return msg.reply('🚫 You must supply 1 question.');
		}
		if (
			!answers ||
      answers.length < 2 ||
      !Array.isArray(answers) ||
      answers.length > 10
		) {
			return msg.reply('🚫 You must supply between 2 and 10 answers.');
		}
		let answerMsg = '';
		for (let i = 0; i < answers.length; i++) {
			answerMsg += `${numToString[i]} ${answers[i]}\n`;
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
			timestamp: new Date(),
			author: {
				name: 'CMYK',
				icon_url: 'https://d.pr/i/B8VFju.png'
			}
		};
		try {
			console.log(embed);
			const e = new RichEmbed(embed);
			console.log(e);
			const response = await msg.channel.sendEmbed(new RichEmbed(embed));
			for (let i = 0; i < answers.length; i++) {
				await response.react(numToEmoji[i]);
			}
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = Poll;
