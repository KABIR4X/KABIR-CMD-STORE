// uptime.js – Scarllet Bitch Instagram Bot

const startTime = Date.now();

// Gothic / Blackletter Unicode map
const gothicMap = {
  a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦',
  j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯',
  s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷',
  A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ',
  J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ',
  S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  ' ': ' ', ':': ':', '-': '—', '/': '/', '.': '.', 'd': '𝔡', 'h': '𝔥', 'm': '𝔪', 's': '𝔰'
};

function toGothic(text) {
  return text.split('').map(char => gothicMap[char] || char).join('');
}

function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

function getUptime() {
  const uptimeMs = Date.now() - startTime;
  const formatted = formatUptime(uptimeMs);

  const title = toGothic("Scarllet Bitch");
  const label = toGothic("Uptime");
  const status = toGothic("Online");

  return `
╔══════════════════════════════════════╗
║                                      ║
║          ${title}          ║
║                                      ║
║     ${label}  :  ${toGothic(formatted)}     ║
║     ${status}   :  ☾ Online ☽         ║
║                                      ║
╚══════════════════════════════════════╝
`.trim();
}

// Export for the bot
module.exports = {
  getUptime,
  startTime
};
