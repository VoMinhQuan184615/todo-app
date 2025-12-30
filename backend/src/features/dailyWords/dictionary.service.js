import axios from "axios";

export const getWordDetail = async (word) => {
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = res.data[0];
    return {
      word,
      phonetic: data.phonetic || "",
      meaningVi: data.meanings[0].definitions[0].definition,
      example: data.meanings[0].definitions[0].example || "",
    };
  } catch {
    return null;
  }
};
