import { getDailyWords } from "./dailyWord.service.js";

export const getDailyWordController = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getDailyWords(userId);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to get daily words" });
  }
};
