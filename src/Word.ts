import { Hebrew } from "./Language";
import { Letter } from "./Letter";

export class Word {
  private letters: Letter[];

  constructor(input: string | Letter[]) {
    if (typeof input === "string")
      this.letters = input.split("").map((letter) => new Letter(letter));
    else this.letters = input;
  }

  public getString() {
    return this.letters.map((letter) => letter.getCharacter()).join("");
  }

  public printWord() {
    console.log(this.getString());
  }

  public printValue() {
    console.log(this.getValue());
  }

  public printInfo() {
    const word = this.getString();
    const value = this.getValue();

    console.log(`${word} = ${value}`);
  }

  public getValue() {
    return this.letters.reduce(
      (acc, letter) => acc + (letter.getValue() || 0),
      0
    );
  }

  public getLetters() {
    return this.letters;
  }

  public getLetterWithValue(value: number) {
    return this.letters.find((letter) => letter.getValue() === value);
  }
}

const hebrew = new Hebrew();
export class HebrewWord extends Word {
  constructor(input: string | Letter[] | number[]) {
    let letters = input;
    if (typeof input === "string")
      letters = input.split("").map((letter) => hebrew.getLetter(letter));
    else if (typeof input[0] === "number")
      letters = input.map((letter) => hebrew.getLetter(letter));

    super(letters as Letter[]);
  }
}

export class EnglishWord extends Word {
  constructor(input: string | Letter[]) {
    super(input);
  }
}
