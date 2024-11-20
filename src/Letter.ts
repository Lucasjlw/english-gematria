export class Letter {
  private character: string;
  private number: number | undefined;

  constructor(character: string, number: number | undefined = undefined) {
    this.character = character;
    this.number = number;
  }

  public getValue() {
    return this.number ?? 0;
  }

  public getCharacter() {
    return this.character;
  }

  public setValue(number: number) {
    this.number = number;
  }
}
