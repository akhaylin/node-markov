"use strict";

/** Textual markov chain generator. */
const fsP = require("fs/promises");

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (!chains[word]) {
        chains[word] = [];
      }

      chains[word].push(nextWord);
    }
    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let currentWord = this.words[0];
    const result = [];

    while (currentWord) {
      result.push(currentWord);
      const nextWords = this.chains[currentWord];
      currentWord = this.getRandomWord(nextWords)
    }

    return result.join(' ');

  }

  /**
   * Takes a list of words, chooses random word in list,
   * returns the random word
   */
  getRandomWord(nextWords){
    const randomIndex = Math.floor(Math.random() * nextWords.length);
    return nextWords[randomIndex];
  }

  /**
   * Takes a file path and reads the file
   * returns the file contents in a string
   */
  static async readMyFile(path) {
    try {
      let content = await fsP.readFile(path, "utf8");
      return content;
    } catch (err) {
      process.exit(1);
    }
  }
}

module.exports = {
  MarkovMachine,
};
