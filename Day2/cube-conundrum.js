const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  function parseData(data) {
    const games = data.trim().split("\n");

    const result = [];

    games.forEach((game) => {
      const [gameNum, colorData] = game.split(": ");
      const gameNumber = gameNum.trim();

      const segments = colorData.split(";");

      const colors = segments.map((segment) => {
        const colorCounts = segment.split(", ").map((item) => {
          const parts = item.trim().split(" ");
          const count = parseInt(parts[0]);
          const color = parts.slice(1).join(" ");
          return { color: color, count: count };
        });
        return colorCounts;
      });

      result.push({ gameNumber: gameNumber, rounds: colors });
    });

    return result;
  }

  function checkRounds(games) {
    const limits = {
      red: 12,
      green: 13,
      blue: 14,
    };

    games.forEach((game) => {
      game.rounds.forEach((round, index) => {
        const counts = {
          red: 0,
          green: 0,
          blue: 0,
        };

        round.forEach((item) => {
          if (counts.hasOwnProperty(item.color)) {
            counts[item.color] += item.count;
          }
        });

        const isValie =
          counts.red <= limits.red &&
          counts.green <= limits.green &&
          counts.blue <= limits.blue;
        console.log(
          `Game ${game.gameNumber}, Round ${index + 1}: ${
            isValie ? "Valid" : "Invalid"
          }`
        );
      });
    });
  }

  const parsedData = parseData(data);

  //console.log(JSON.stringify(parsedData, null, 2));
  console.log(checkRounds(parsedData));
});
