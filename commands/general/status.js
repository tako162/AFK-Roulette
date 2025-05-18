// Discord
const Discord = require("discord.js");
// app-root-path
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
const string = require(app_root + "/strings/string.js");
const settingAPI = require(app_root + "/settingsAPI.js");
module.exports = {
  // スラッシュコマンド登録
  data: new Discord.SlashCommandBuilder()
    .setName("status")
    .setDescription("ゲームの設定を確認します"),
  // コマンド処理
  async execute(interaction) {
    console.log("/status");

    await interaction.deferReply(); // これが重要

    const settings = await settingAPI.fetchSettings(interaction.guild.id);

    const message = `現在の設定:\n- タイムアウト期間: ${settings.timeoutPeriod}日\n- 抽選頻度: ${settings.drawIntervalDay}日ごと\n- 対象人数: ${settings.timeoutTargetsCount}人`;

    await interaction.editReply(message);
  },
};
