const Sandbox = require('sandbox');
const config = require('../../config');
const BasePlugin = require('../plugin-base.js');

class Evaluate extends BasePlugin {
	constructor() {
		super();
		this.conf = {
			name: 'eval',
			help: `\`${config.DISCORD_PREFIX}eval [code]\` Evaluates given JS code in a sandbox, and returns result (console.log is ignored).`,
			regex: new RegExp(`^${config.DISCORD_PREFIX}eval`)
		};
	}

	async handler(msg) {
		super.handler(msg);
		const input = msg.cleanContent
			.replace(config.DISCORD_PREFIX + 'eval ', '')
			.replace(/```/g, '');
		const s = new Sandbox();
		s.run(input, output => {
			return (
				msg.reply(
					'▶ Input\n```JS\n' +
            input +
            '```\n✅ Output\n```' +
            output.result +
            '```'
				)
			);
		});
	}
}

module.exports = Evaluate;
