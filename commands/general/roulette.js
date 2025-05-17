// Discord
const Discord = require("discord.js");
// app-root-path
const app_root = require("app-root-path");
const { PING } = require("../../strings/string");
const config = require(app_root + "/config.js");
const string = require(app_root + "/strings/string.js");
module.exports = {
  // スラッシュコマンド登録
  data: new Discord.SlashCommandBuilder()
    .setName(string.ROULETTE)
    .setDescription(string.ROULETTE_DESCRIPTION),
  // コマンド処理
  async execute(interaction, client) {
    // コマンド実行ログ
    console.log("/" + string.ROULETTE);
    // Embed
    const embed = new Discord.EmbedBuilder()
      .setTitle("setTitle")
      .setDescription("setDescription")
      .addFields([{ name: "name", value: "value" }])
      .setColor("#FF0000")
      .setTimestamp();
    // 返信する
    interaction.reply({ embeds: [embed] });
  },
};
