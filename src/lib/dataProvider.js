import { generatedWordsWithDuplicates } from "../data/generatedWords";

export const getGeneratedWords = () => {
  return [...new Set(generatedWordsWithDuplicates)];
};
