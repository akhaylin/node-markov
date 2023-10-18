"use strict";

const { MarkovMachine } = require("./markov");

describe("Markov", function () {

  test("getChains", function () {
    const markov = new MarkovMachine("The cat in the hat.");
    expect(markov.chains).toEqual({
         "The": ["cat"],
         "cat": ["in"],
         "in": ["the"],
         "the": ["hat."],
         "hat.": [null],
        });
  });

  test("getText no branches", function () {
    const markov = new MarkovMachine("Sam I am.");
    expect(markov.getText()).toEqual("Sam I am.");
  });

  test("getText first word of input same as first word of output", function () {
    const text = "The cat is in the hat. The cat is the cat. The hat is a cat.";
    const markov = new MarkovMachine(text);

    expect(markov.words[0]).toEqual(markov.getText().split(" ")[0]);
  });
});