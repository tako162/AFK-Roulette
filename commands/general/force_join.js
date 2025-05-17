// Discord
const Discord = require("discord.js");
// app-root-path
const app_root = require("app-root-path");
const config = require(app_root + "/config.js");
const string = require(app_root + "/strings/string.js");

module.exports = {
  // スラッシュコマンド登録
  data: new Discord.SlashCommandBuilder()
    .setName("force_join")
    .setDescription("他のユーザーをゲームに参加させる（管理者用）")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("ゲームに参加させたいユーザー")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageRoles),

  // コマンド処理
  async execute(interaction, client) {
    console.log("/force_join");

    const targetUser = interaction.options.getMember("user");
    const roleName = "GamePlayer";
    const guild = interaction.guild;

    // ロールを探す
    let role = guild.roles.cache.find((r) => r.name === roleName);

    // なければ作成
    if (!role) {
      try {
        role = await guild.roles.create({
          name: roleName,
          color: "Random",
          mentionable: true,
          reason: "ゲーム参加用ロールが存在しなかったため作成",
        });
        console.log(`ロール「${roleName}」を作成しました。`);
      } catch (err) {
        console.error("ロール作成失敗:", err);
        return await interaction.reply({
          content:
            "ロールを作成できませんでした。Botの権限を確認してください。",
          ephemeral: true,
        });
      }
    }

    // すでにロールがあるか
    if (targetUser.roles.cache.has(role.id)) {
      return await interaction.reply({
        content: `${targetUser.displayName} はすでにゲームに参加しています。`,
        ephemeral: true,
      });
    }

    // ロールを付与
    try {
      await targetUser.roles.add(role);
      await interaction.reply({
        content: `${targetUser.displayName} をゲームに参加させました。`,
      });
    } catch (err) {
      console.error("ロール付与失敗:", err);
      await interaction.reply({
        content: "ロールを付与できませんでした。Botの権限を確認してください。",
        ephemeral: true,
      });
    }
  },
};
