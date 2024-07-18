// Get puzzle input

const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const lines = data.split("\n");
  //console.log(lines);

  let totalSum = 0;

  // // For each line, combine the first digit and the last digit to form a two-digit number
  // // Find sum of all two-digit numbers
  // lines.forEach((line) => {
  //   const digits = line.replace(/\D/g, "");
  //   //console.log(digits);
  //   const firstDigit = parseInt(digits[0]);
  //   const lastDigit = parseInt(digits[digits.length - 1]);
  //   //console.log(firstDigit, lastDigit);
  //   const newNumber = parseInt(firstDigit.toString() + lastDigit.toString());
  //   //console.log(newNumber);
  //   totalSum += newNumber;
  //   console.log(totalSum);
  // });

  function replaceString(str) {
    const numberWords = {
      one: "o1e",
      two: "t2o",
      three: "t3e",
      four: "f4r",
      five: "f5e",
      six: "s6x",
      seven: "s7n",
      eight: "e8t",
      nine: "n9e",
    };
    for (const word in numberWords) {
      str = str.replace(new RegExp(word, "g"), numberWords[word]);
    }
    return str;
  }

  lines.forEach((line) => {
    let replacedLine = replaceString(line);
    //console.log("Original line:", line);
    //console.log("Replaced line:", replacedLine);

    const digits = replacedLine.match(/\d/g);
    //console.log("Digits:", digits);

    const firstDigit = parseInt(digits[0]);
    const lastDigit = parseInt(digits[digits.length - 1]);
    // console.log(firstDigit, lastDigit);

    const newNumber = parseInt(firstDigit.toString() + lastDigit.toString());
    //console.log(newNumber);

    totalSum += newNumber;
    console.log(totalSum);
  });
});
