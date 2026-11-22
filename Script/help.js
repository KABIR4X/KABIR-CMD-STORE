module.exports = {
	config: {
		name: 'help',
		aliases: ['h', 'menu', 'cmds'],
		version: '2.1.0',
		author: 'KABIR | ISHIGAMI',
		countDown: 3,
		role: 0,
		description: { en: 'Reveal the forbidden commands of the void' },
		category: 'info',
		guide: {
			en: '{pn} [command name]'
		}
	},

	onStart: async function ({ message, args, prefix, role }) {
		const A = global.Anchestor;
		const myRole = role || 0;

		// Single command info
		if (args[0]) {
			const input = args[0].toLowerCase();
			const name = A.aliases.get(input) || input;
			const command = A.commands.get(name);
			if (!command) {
				return message.reply(`༺ 𝔑𝔬 𝔱𝔯𝔞𝔠𝔢 𝔣𝔬𝔲𝔫𝔡 ༻\n\nThe command "${input}" does not exist in these halls.`);
			}

			const cfg = command.config;
			const roleStr = ['All Users', 'Group Admin', 'Bot Admin'][cfg.role] || 'Unknown';
			const desc = (cfg.description && (cfg.description.en || cfg.description))
				|| (cfg.longDescription && cfg.longDescription.en)
				|| (cfg.shortDescription && (cfg.shortDescription.en || cfg.shortDescription))
				|| 'No description';
			const usage = cfg.guide
				? String(cfg.guide.en || cfg.guide)
					.split('{pn}').join(`\( {prefix} \){cfg.name}`)
					.split('{p}').join(prefix)
					.split('{n}').join(cfg.name)
				: 'No guide available.';

			return message.reply(
`༺ 𝔇𝔞𝔯𝔨 𝔄𝔯𝔠𝔥𝔦𝔳𝔢: ${cfg.name} ༻

├ Description: ${desc}
├ Aliases: ${(cfg.aliases || []).join(', ') || 'None'}
├ Version: ${cfg.version || '1.0'}
├ Role: ${roleStr}
├ Cooldown: ${cfg.countDown || 0}s
├ Author: ${cfg.author || 'Unknown'}
├ Usage: ${usage}
╰━━━━━━━━━━━━━━━━━━━`
			);
		}

		// Full command list
		const byCategory = {};
		let total = 0;
		for (const [key, cmd] of A.commands.entries()) {
			const cfg = cmd.config;
			if ((cfg.role || 0) > myRole) continue;
			const cat = (cfg.category || 'misc').toUpperCase();
			(byCategory[cat] = byCategory[cat] || []).push(key === cfg.name ? cfg.name : key);
			total++;
		}

		const categoryTitles = {
			'AI': '𝗔𝗜 𝘾𝙃𝘼𝙏',
			'AI-CHAT': '𝗔𝗜 𝘾𝙃𝘼𝙏',
			'AI-IMAGE': '𝗔𝗜 𝙄𝙈𝘼𝙂𝙀',
			'IMAGE GENERATION': '𝗔𝗜 𝙄𝙈𝘼𝙂𝙀',
			'IMAGE': '𝙄𝙈𝘼𝙂𝙀',
			'ANIME': '𝘼𝙉𝙄𝙈𝙀',
			'BANK': '𝘽𝘼𝙉𝙆',
			'GAME': '𝙂𝘼𝙈𝙀𝙎',
			'FUN': '𝙁𝙐𝙉',
			'ADMIN': '𝘼𝘿𝙈𝙄𝙉',
			'OWNER': '𝙊𝙒𝙉𝙀𝙍',
			'BOX CHAT': '𝘽𝙊𝙓 𝘾𝙃𝘼𝙏',
			'GROUP': '𝙂𝙍𝙊𝙐𝙋',
			'CONFIG': '𝘾𝙊𝙉𝙁𝙄𝙂',
			'INFO': '𝙄𝙉𝙁𝙊',
			'UTILITY': '𝙐𝙏𝙄𝙇𝙄𝙏𝙔',
			'SYSTEM': '𝙎𝙔𝙎𝙏𝙀𝙈',
			'MISC': '𝙊𝙏𝙃𝙀𝙍𝙎',
			'OTHERS': '𝙊𝙏𝙃𝙀𝙍𝙎'
		};

		let finalMsg = `༺ 𝔄𝔫𝔠𝔥𝔢𝔰𝔱𝔬𝔯'𝔰 𝔇𝔞𝔯𝔨 ℭ𝔬𝔪𝔪𝔞𝔫𝔡𝔰 ༻\n`;

		for (const cat of Object.keys(byCategory).sort()) {
			const title = categoryTitles[cat] || cat;
			finalMsg += `\n╭─╼━━━━━━━━╾─╮\n│    ${title}\n`;
			for (const cmd of byCategory[cat].sort())
				finalMsg += `│ • ${cmd}\n`;
			finalMsg += `╰─╼━━━━━━━━╾─╯\n`;
		}

		finalMsg += `
╭─╼━━━━━━━━╾─╮
│   𝔄𝔟𝔬𝔲𝔱 𝔱𝔥𝔢 𝔅𝔬𝔱
│ - ${total} commands sealed
│ - Prefix: ${prefix}
│ - Crafted for Instagram DMs
╰─━━━━━━━━━╾─╯

─────✧
│ » Type ${prefix}help <cmd> for details
├────────✧
│ [KABIR | ISHIGAMI]
╰─────────────

🖤 May the shadows guide you 🖤`;

		return message.reply(finalMsg);
	}
};
