const csv = require("csv-parser");
const fs = require("fs");

let word_array = [];
let words = {};

fs.createReadStream("processed_tweets.csv")
  .pipe(csv())
  .on("data", (row) => {
    word_array.push(row.RT);
  })
  .on("end", () => {
    for (let i = 0; i < word_array.length; i++) {
      if (!words[word_array[i]]) {
        words[word_array[i]] = [];
      }
      console.log("current" + i);
      words[word_array[i]].push(word_array[i + 1]);
    }

    jsonData = JSON.stringify(words);
    fs.writeFile("dataset.txt", jsonData, (err) => console.log(err));

    console.log("CSV file successfully processed");
    console.log(words);
  });
