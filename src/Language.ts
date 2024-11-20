import { Letter } from "./Letter";

export class Language {
  private letters: Letter[];

  constructor(letters: Letter[]) {
    this.letters = letters;
  }

  public getLetters() {
    return this.letters;
  }

  public getLetter(search: string | number) {
    const letter = this.letters.find(
      (letter) =>
        letter.getCharacter() === search || letter.getValue() === search
    );

    if (letter == null) throw new Error(`Letter ${search} not in language`);

    return letter;
  }
}

export class Hebrew extends Language {
  constructor() {
    const HebrewLetters = [
      new Letter("א", 1),
      new Letter("ב", 2),
      new Letter("ג", 3),
      new Letter("ד", 4),
      new Letter("ה", 5),
      new Letter("ו", 6),
      new Letter("ז", 7),
      new Letter("ח", 8),
      new Letter("ט", 9),
      new Letter("י", 10),
      new Letter("כ", 20),
      new Letter("ל", 30),
      new Letter("מ", 40),
      new Letter("ם", 40),
      new Letter("נ", 50),
      new Letter("ס", 60),
      new Letter("ע", 70),
      new Letter("פ", 80),
      new Letter("צ", 90),
      new Letter("ק", 100),
      new Letter("ר", 200),
      new Letter("ש", 300),
      new Letter("ת", 400),
    ];

    super(HebrewLetters);
  }
}

export class English extends Language {
  constructor() {
    const EnglishLetters = [
      new Letter("A"),
      new Letter("B"),
      new Letter("C"),
      new Letter("D"),
      new Letter("E"),
      new Letter("F"),
      new Letter("G"),
      new Letter("H"),
      new Letter("I"),
      new Letter("J"),
      new Letter("K"),
      new Letter("L"),
      new Letter("M"),
      new Letter("N"),
      new Letter("O"),
      new Letter("P"),
      new Letter("Q"),
      new Letter("R"),
      new Letter("S"),
      new Letter("T"),
      new Letter("U"),
      new Letter("V"),
      new Letter("W"),
      new Letter("X"),
      new Letter("Y"),
      new Letter("Z"),
    ];

    super(EnglishLetters);
  }
}
