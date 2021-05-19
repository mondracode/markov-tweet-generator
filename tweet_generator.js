require("dotenv").config();
const fs = require("fs");
const Twit = require("twit");

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

let words = {};

let randomProperty = (obj) => {
  let keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const createTweet = (words) => {
  let tweet = randomProperty(words);
  current_word = tweet.repeat(1);

  while (tweet.length <= 140) {
    if (words[current_word][0]) {
      new_word = words[current_word][(words[current_word].length * Math.random()) | 0].repeat(1);
      tweet += " " + new_word;
      current_word = new_word.repeat(1);
    } else break;
  }

  T.post("statuses/update", { status: tweet }, function (err, data, response) {
    console.log(data);
  });

  return true;
};

fs.readFile("./dataset.txt", "utf8", (err, fileContents) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    const words = JSON.parse(fileContents);
    gen_tweet = createTweet(words);
    console.log(gen_tweet);
    console.log(gen_tweet.length);
  } catch (err) {
    console.error(err);
  }
});
