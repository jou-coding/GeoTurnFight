// prisma/seed.ts
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const OECD_COUNTRIES = [
  { code: "AU", nameEn: "Australia", nameJa: "オーストラリア" },
  { code: "AT", nameEn: "Austria", nameJa: "オーストリア" },
  { code: "BE", nameEn: "Belgium", nameJa: "ベルギー" },
  { code: "CA", nameEn: "Canada", nameJa: "カナダ" },
  { code: "CL", nameEn: "Chile", nameJa: "チリ" },
  { code: "CO", nameEn: "Colombia", nameJa: "コロンビア" },
  { code: "CR", nameEn: "Costa Rica", nameJa: "コスタリカ" },
  { code: "CZ", nameEn: "Czechia", nameJa: "チェコ" },
  { code: "DK", nameEn: "Denmark", nameJa: "デンマーク" },
  { code: "EE", nameEn: "Estonia", nameJa: "エストニア" },
  { code: "FI", nameEn: "Finland", nameJa: "フィンランド" },
  { code: "FR", nameEn: "France", nameJa: "フランス" },
  { code: "DE", nameEn: "Germany", nameJa: "ドイツ" },
  { code: "GR", nameEn: "Greece", nameJa: "ギリシャ" },
  { code: "HU", nameEn: "Hungary", nameJa: "ハンガリー" },
  { code: "IS", nameEn: "Iceland", nameJa: "アイスランド" },
  { code: "IE", nameEn: "Ireland", nameJa: "アイルランド" },
  { code: "IL", nameEn: "Israel", nameJa: "イスラエル" },
  { code: "IT", nameEn: "Italy", nameJa: "イタリア" },
  { code: "JP", nameEn: "Japan", nameJa: "日本" },
  { code: "KR", nameEn: "Korea", nameJa: "韓国" },
  { code: "LV", nameEn: "Latvia", nameJa: "ラトビア" },
  { code: "LT", nameEn: "Lithuania", nameJa: "リトアニア" },
  { code: "LU", nameEn: "Luxembourg", nameJa: "ルクセンブルク" },
  { code: "MX", nameEn: "Mexico", nameJa: "メキシコ" },
  { code: "NL", nameEn: "Netherlands", nameJa: "オランダ" },
  { code: "NZ", nameEn: "New Zealand", nameJa: "ニュージーランド" },
  { code: "NO", nameEn: "Norway", nameJa: "ノルウェー" },
  { code: "PL", nameEn: "Poland", nameJa: "ポーランド" },
  { code: "PT", nameEn: "Portugal", nameJa: "ポルトガル" },
  { code: "SK", nameEn: "Slovak Republic", nameJa: "スロバキア" },
  { code: "SI", nameEn: "Slovenia", nameJa: "スロベニア" },
  { code: "ES", nameEn: "Spain", nameJa: "スペイン" },
  { code: "SE", nameEn: "Sweden", nameJa: "スウェーデン" },
  { code: "CH", nameEn: "Switzerland", nameJa: "スイス" },
  { code: "TR", nameEn: "Türkiye", nameJa: "トルコ" },
  { code: "GB", nameEn: "United Kingdom", nameJa: "イギリス" },
  { code: "US", nameEn: "United States", nameJa: "アメリカ" },
] as const;

async function main() {
  // 何回 seed を流しても壊れないように upsert（重複しない）
  for (const c of OECD_COUNTRIES) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {
        nameJa: c.nameJa,
        nameEn: c.nameEn,
        isOecd: true,
      },
      create: {
        code: c.code,
        nameJa: c.nameJa,
        nameEn: c.nameEn,
        isOecd: true,
      },
    });
  }

  console.log(`Seeded OECD countries: ${OECD_COUNTRIES.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
