const API_URL = process.env.API_URL;
const API_SECRET = process.env.API_SECRET;

// パラメータをURLエンコード形式に変換するユーティリティ
function toFormData(obj) {
  return new URLSearchParams(obj).toString();
}

async function fetchSettings(guildId) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: toFormData({
      secret: API_SECRET,
      guild_id: guildId,
      action: "get",
    }),
  });

  if (!res.ok) throw new Error("設定の取得に失敗しました");
  return await res.json();
}

async function saveSettings(guildId, newSettings) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: toFormData({
      secret: API_SECRET,
      guild_id: guildId,
      action: "set",
      settings: JSON.stringify(newSettings),
    }),
  });

  if (!res.ok) throw new Error("設定の保存に失敗しました");
}
