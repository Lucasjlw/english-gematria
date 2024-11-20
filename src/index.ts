import { English, Hebrew } from "./Language";
import { EnglishWord, HebrewWord, Word } from "./Word";

import { Letter } from "./Letter";
import { chunk } from "lodash";
import fs from "fs";
import { translateWords } from "./ai";

const hebrew = new Hebrew();

function main() {
  const wordInHebrew = new HebrewWord([10, 50, 4, 1]);

  const wordInEnglish = new EnglishWord("ADONAI");

  wordInHebrew.printInfo();

  while (wordInEnglish.getValue() != wordInHebrew.getValue()) {
    wordInEnglish.printInfo();
    for (const letter of wordInEnglish.getLetters()) {
      if (wordInEnglish.getLetterWithValue(letter.getValue() + 1) != letter) {
        letter.setValue(letter.getValue() + 1);
      }
    }
  }
}

function getAllPossibleHebrewWords(length: number) {
  const letters = hebrew.getLetters();
  const words: Word[] = [];

  function generateWords(currentLetters: Letter[], remainingLength: number) {
    if (remainingLength === 0) {
      words.push(new Word(currentLetters));
      return;
    }

    for (const letter of letters) {
      generateWords([...currentLetters, letter], remainingLength - 1);
    }
  }

  generateWords([], length);

  fs.writeFileSync(
    "allHebrewWords.json",
    JSON.stringify(words.map((word) => word.getString()))
  );

  console.log("Words have been written");
}

function getWordsFromFile() {
  const words = fs.readFileSync("allHebrewWords.json", "utf8");
  return JSON.parse(words);
}

async function translateAllHebrewWords() {
  const words = getWordsFromFile();

  let translatedWords = {};
  const promises: Promise<void>[] = [];
  for (const batch of chunk(words, 1000))
    promises.push(
      translateWords(batch).then((aiResponse) => {
        try {
          aiResponse = aiResponse.replace("```json", "").replace("```", "");
          const translatedBatch = JSON.parse(aiResponse);
          console.log(translatedBatch);
          translatedWords = { ...translatedWords, ...translatedBatch };
        } catch (e) {
          console.log("error in");
        }
      })
    );

  await Promise.allSettled(promises);

  console.log(translatedWords);

  return translatedWords;
}

function writeWordsToMappedFile(
  fileName: string,
  words: { [key: string]: string }
) {
  const jsonMap: { [key: number]: { words: string[] } } = {};

  for (const [hebrewWord, englishWord] of Object.entries(words)) {
    try {
      const value = new HebrewWord(hebrewWord).getValue();
      jsonMap[value] = jsonMap[value] || { words: [] };
      jsonMap[value].words.push(`${hebrewWord} = ${englishWord}`);
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(fileName, JSON.stringify(jsonMap));

  console.log(`Wrote ${fileName}`);
}

// getAllPossibleHebrewWords(4);
translateAllHebrewWords().then((words) =>
  writeWordsToMappedFile("hebrewWordMap.json", words)
);
