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

  // function checkRounds(games) {
  //   const limits = {
  //     red: 12,
  //     green: 13,
  //     blue: 14,
  //   };

  //   const validGameNumbers = [];

  //   games.forEach((game) => {
  //     let allRoundsValid = true;

  //     game.rounds.forEach((round, index) => {
  //       const counts = {
  //         red: 0,
  //         green: 0,
  //         blue: 0,
  //       };

  //       round.forEach((item) => {
  //         if (counts.hasOwnProperty(item.color)) {
  //           counts[item.color] += item.count;
  //         }
  //       });

  //       const isValid =
  //         counts.red <= limits.red &&
  //         counts.green <= limits.green &&
  //         counts.blue <= limits.blue;

  //       if (!isValid) {
  //         allRoundsValid = false;
  //       }

  //       // console.log(
  //       //   `Game ${game.gameNumber}, Round ${index + 1}: ${
  //       //     isValid ? "Valid" : "Invalid"
  //       //   }`
  //       // );
  //     });

  //     if (allRoundsValid) {
  //       validGameNumbers.push(game.gameNumber);
  //     }
  //   });

  //   return validGameNumbers;
  // }

  // function extractNumbersAndSum(str) {
  //   if (typeof str !== "string") {
  //     throw new TypeError("Input must be a string");
  //   }
  //   return (str.match(/\d+/g) || [])
  //     .map(Number)
  //     .reduce((sum, num) => sum + num, 0);
  // }

  function calculateMinimumCubes(games) {
    const minCubes = [];

    games.forEach((game) => {
      const minCounts = {
        red: 0,
        green: 0,
        blue: 0,
      };

      game.rounds.forEach((round) => {
        round.forEach((item) => {
          if (minCounts.hasOwnProperty(item.color)) {
            minCounts[item.color] = Math.max(minCounts[item.color], item.count);
          }
        });
      });

      minCubes.push(minCounts);
    });
    return minCubes;
  }

  function calculatePower(cubeSet) {
    return cubeSet.red * cubeSet.green * cubeSet.blue;
  }

  function sumPowers(minCubes) {
    return minCubes.reduce((total, cubes) => {
      return total + calculatePower(cubes);
    }, 0);
  }

  const parsedData = parseData(data);
  const minCubes = calculateMinimumCubes(parsedData);
  const totalPower = sumPowers(minCubes);

  console.log(totalPower);

  // //console.log(JSON.stringify(parsedData, null, 2));
  // const validGames = checkRounds(parsedData);
  // //console.log(validGames);

  // const sumOfNumbers = extractNumbersAndSum(validGames.join(" "));
  // console.log(sumOfNumbers);
});
