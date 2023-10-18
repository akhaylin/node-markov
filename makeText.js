"use strict";

const { MarkovMachine } = require("/Users/Matt/rithm/exercises/node-markov/markov");
// const fsP = require("fs/promises");
const { cat, webCat } = require("/Users/Matt/rithm/exercises/node-files/step3");


/**
 * Takes a pathway to a text file
 * reads the file and returns its contents.
 */
async function cat(path) {
  let contents;
  console.log("path=", path);
  try {
    contents = await fsP.readFile(path, "utf8");

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  return contents;
}

/**
 * Takes a url, performs a get to that url
 * and returns the html.
 */
async function webCat(url) {
  let html;
  console.log("url=", url);
  try {
    const response = await fetch(url);
    html = await response.text();
  }
  catch (err) {
    console.log(`error fetching ${url}`, err);
    process.exit(1);
  }
  return html;
}


async function main() {

  const argv = process.argv;
  let content;
  const fileOrUrl = argv[3];

  debugger;
  if (argv[2] === 'url') {
    console.log("url");
    //const url = new URL(fileOrUrl);
    content = await webCat(fileOrUrl);
  } else if (argv[2] === 'file') {
    console.log("file");
    content = await cat(fileOrUrl);
  }

  const markov = new MarkovMachine(content);
  console.log(markov.getText());
}

main();
