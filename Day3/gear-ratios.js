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

  function isNextToSymbol(grid, row, startCol, endCol) {
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

    for (let col = startCol; col <= endCol; col++) {
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
    }

    return false;
  }

  const lines = data.split("\n");
  //console.log(lines);

  const grid = lines.map((line) => line.split(""));

  for (let row = 0; row < grid.length; row++) {
    let col = 0;
    while (col < grid[row].length) {
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

        if (isNextToSymbol(grid, row, startCol, endCol)) {
          console.log(number);
        }
      } else {
        col++;
      }
    }
  }
});
