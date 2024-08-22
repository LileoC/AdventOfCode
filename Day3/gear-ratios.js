const fs = require("fs");

const filePath = "./input.txt";

const symbols = ["*", "/", "+", "-", "=", "@", "#", "%", "&", "$"];

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  function isSymbol(cell) {
    return symbols.includes(cell);
  }

  function isNextToSymbol(grid, row, col) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        if (isSymbol(grid[newRow][newCol])) {
          return true;
        }
      }
    }

    return false;
  }

  const lines = data.split("\n");
  //console.log(lines);

  const grid = lines.map((line) => line.split(""));

  let totalSum = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!isNaN(grid[row][col]) && grid[row][col].trim() !== "") {
        let startCol = col;

        while (
          col < grid[row].length &&
          !isNaN(grid[row][col]) &&
          grid[row][col].trim() !== ""
        ) {
          col++;
        }

        let endCol = col - 1;
        let number = grid[row].slice(startCol, endCol + 1).join("");

        const numValue = parseInt(number, 10);

        let isPartNumber = false;
        for (let checkCol = startCol; checkCol <= endCol; checkCol++) {
          if (isNextToSymbol(grid, row, checkCol)) {
            isPartNumber = true;
            break;
          }
        }

        if (isPartNumber) {
          totalSum += numValue;
          console.log(number);
        }

        col = endCol;
      }
    }
  }
  console.log("Total sum:", totalSum);
});
