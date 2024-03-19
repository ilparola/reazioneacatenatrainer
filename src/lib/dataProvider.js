import { generatedWordsWithDuplicates } from "../data/generatedWords";
import { capturedWords } from "../data/capturedWords";

export const getGeneratedWords = (removeDuplicate = false) => {
  if (removeDuplicate) {
    return [...new Set(generatedWordsWithDuplicates)];
  }
  return generatedWordsWithDuplicates;
};

export const getCapturedWords = (removeDuplicate = false) => {
  if (removeDuplicate) {
    return [...new Set(capturedWords)];
  }
  return capturedWords;
};
