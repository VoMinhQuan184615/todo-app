import DailyWord from "./dailyWorld.model.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getWordDetail } from "./dictionary.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const WORD_POOL = JSON.parse(
  readFileSync(join(__dirname, "../../data/common-words.json"), "utf-8")
);

export const getDailyWords = async (userId) => {
  const today = new Date().toISOString().slice(0, 10);
  const existed = await DailyWord.findOne({ userId, date: today });
  if (existed) return existed;

  // Select 5 random words
  const selected = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_POOL.length);
    selected.push(WORD_POOL[randomIndex]);
  }

  const words = [];
  for (const w of selected) {
    const detail = await getWordDetail(w);
    if (detail) words.push(detail);
  }

  // Save to database
  const record = await DailyWord.create({
    userId,
    date: today,
    words,
  });

  return record;
};
