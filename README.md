## Introduction
This is a simple Node.js process that generates a list of Hebrew words and their gematria values. The goal is to develop a proper system of English gematria by finding what schema of English numeracy allows a direct equality between any Hebrew word and it's accepted English translation.
For example, 65 = Adonai = אֲדֹנָי.

## Running the code
1. Clone the repo
2. Do `yarn install`
4. Create a .env file in the root of the cloned repo.
5. Add your `OPENAI_API_KEY` to the .env file
6. 3. Comment or uncomment the functions you'd like to play with.
7. Type `yarn dev` to run to execute the code.

## Theory
Some general remarks are to be made about this process:
- The English gematria equivalent will not be as simple and straightforward as the Hebrew one.
  - This is because there are more English letters than Hebrew ones, and we need to find the proper method of dealing with the vowels which Hebrew does not have.
  - This would imply that depending on the order in which the English letters are given, some letters will have different values.
