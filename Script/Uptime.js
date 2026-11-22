module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "up", "runtime"],
    version: "1.0.0",
    author: "Scarllet Bitch",
    countDown: 5,
    role: 0,
    shortDescription: "Check Scarllet Bitch uptime",
    longDescription: "Shows how long Scarllet Bitch has been online in gothic style",
    description: {
      en: "Check how long Scarllet Bitch has been online"
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    const startTime = global.GoatBot?.startTime || Date.now() - process.uptime() * 1000;
    const uptimeMs = Date.now() - startTime;

    const gothicMap = {
      a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦',
      j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯',
      s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷',
      A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ',
      J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ',
      S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      ' ': ' ', ':': ':', '-': '—', 'd': '𝔡', 'h': '𝔥', 'm': '𝔪', 's': '𝔰'
    };

    const toGothic = (text) => text.split('').map(c => gothicMap[c] || c).join('');

    const formatUptime = (ms) => {
      const sec = Math.floor(ms / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      const parts = [];
      if (d > 0) parts.push(`${d}d`);
      if (h > 0) parts.push(`${h}h`);
      if (m > 0) parts.push(`${m}m`);
      parts.push(`${s}s`);
      return parts.join(' ');
    };

    const uptime = formatUptime(uptimeMs);
    const title = toGothic("Scarllet Bitch");
    const label = toGothic("Uptime");
    const status = toGothic("Online");

    const msg = `
╔══════════════════════════════════════╗
║                                      ║
║          ${title}          ║
║                                      ║
║     ${label}  :  ${toGothic(uptime)}     ║
║     ${status}   :  ☾ Online ☽         ║
║                                      ║
╚══════════════════════════════════════╝`.trim();

    return message.reply(msg);
  }
};
