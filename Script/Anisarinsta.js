const axios = require('axios');

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function fetchTikTokVideos(query) {
  try {
    const response = await axios.get(`https://lyric-search-neon.vercel.app/kshitiz?keyword=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "anisar",
    aliases: [],
    version: "1.0.0",
    author: "Vex_kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get anime edit video"
    },
    longDescription: {
      en: "Search for anime edit videos from TikTok"
    },
    category: "anime",
    guide: {
      en: "{pn} [query]\nExample: {pn} naruto"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const query = args.join(" ").trim();
    if (!query) {
      return message.reply("Please provide a search query.\nExample: anisar naruto");
    }

    const modifiedQuery = `${query} anime edit`;
    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const videos = await fetchTikTokVideos(modifiedQuery);

    if (!videos || videos.length === 0) {
      return message.reply(`${query} not found.`);
    }

    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoUrl = selectedVideo.videoUrl;

    if (!videoUrl) {
      return message.reply("Error: Video not found.");
    }

    try {
      const videoStream = await getStreamFromURL(videoUrl);
      await api.sendMessage({
        body: "",
        attachment: videoStream
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing the video.\nPlease try again later.");
    }
  },

  onChat: async function ({ api, event, message }) {
    const content = (event.body || "").toLowerCase().trim();
    if (!content.startsWith("anisar")) return;

    const query = content.slice(6).trim();
    if (!query) return;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const videos = await fetchTikTokVideos(`${query} anime edit`);

    if (!videos || videos.length === 0) {
      return message.reply(`${query} not found.`);
    }

    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoUrl = selectedVideo.videoUrl;

    if (!videoUrl) {
      return message.reply("Error: Video not found.");
    }

    try {
      const videoStream = await getStreamFromURL(videoUrl);
      await api.sendMessage({
        body: "",
        attachment: videoStream
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing the video.\nPlease try again later.");
    }
  }
};
