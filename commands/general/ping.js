// Discord
const Discord = require("discord.js");
// app-root-path
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
const string = require(app_root + "/strings/string.js");
// pingコマンド
module.exports = {
  // スラッシュコマンド登録
  data: new Discord.SlashCommandBuilder()
    .setName(string.PING)
    .setDescription(string.PING_DESCRIPTION),
  // コマンド処理
  async execute(interaction, client) {
    // コマンド実行ログ
    console.log("/" + string.PING);
    // Embed
    const embed = new Discord.EmbedBuilder()
      .setTitle(string.EMBED_TITLE_SUCCESS)
      .setDescription(string.ZERO_SPACE)
      .addFields([
        { name: "WebSocket", value: `**${client.ws.ping} ms**` },
        {
          name: "コマンド受信",
          value: `**${new Date() - interaction.createdAt} ms**`,
        },
      ])
      .setColor(config.colors.success)
      .setTimestamp();
    // 返信する
    interaction.reply({ embeds: [embed] });
  },
};
