const tweet = "trying to figure out how many letters there are in the alphabet. so far i can say for certain that there are at least 19. are there any i am missing";

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const foundLetters = [];
const missingLetters = [];

for (let x = 0; x < alphabet.length; ++x) {
  const letter = alphabet[x];

  if (!foundLetters.includes(letter) && tweet.includes(letter)) {
    foundLetters.push(letter);
  } else {
    missingLetters.push(letter);
  }
}

console.log("Tweet:", tweet);
console.log("Letters found:", foundLetters.join(", "), `(${foundLetters.length} letters)`);
console.log("Letters missing:", missingLetters.join(", "), `(${missingLetters.length} letters)`);
