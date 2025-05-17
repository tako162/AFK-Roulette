const Discord = require("discord.js");
const app_root = require("app-root-path");
const { isDate } = require("util/types");
const string = require(app_root + "/strings/string.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("setting")
    .setDescription("ルーレットの設定をします")
    .addIntegerOption((option) =>
      option
        .setName("timeout_span")
        .setDescription("タイムアウトの日数を指定します")
        .setRequired(true),
    )
    .addRoleOption((option) =>
      option
        .setName("roll")
        .setDescription("ゲームに参加するロールを指定します")
        .setRequired(true),
    ),

  async execute(interaction) {
    console.log("/" + string.ROULETTE);

    const timeoutSpan = interaction.options.getInteger("timeout_span");
    const roll = interaction.options.getRole("roll");
    const replyMessage = ``;
    if (roll.name == "everyone") {
      replyMessage = `everyoneを指定することはおすすめできません。/n本当にいいですか？`;
    } else {
      replyMessage = `選択されたタイムアウト期間: ${timeoutSpan}日\n選択されたロール: ${roll.name}`;
    }
    interaction.reply(replyMessage);
  },
};
