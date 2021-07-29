const input = require('readline-sync');


function transform(object){
  let newKey = {};
  for (item in object){
    for(i = 0; i < object[item].length; i++){
    let letter = object[item][i]
    let lwrCsLtter = letter.toLowerCase();
    newKey[lwrCsLtter] = item;
    }
  }
  return newKey;
}


function initialPrompt(){
  console.log("Welcome to the Scrabble score calculator!");
  console.log();
  console.log("Which scoring algorithm would you like to use?")
  console.log();
  console.log("0 - Scrabble: The traditional scoring algorithm.");
  console.log("1 - Simple Score: Each letter is worth 1 point.");
  console.log("2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.");
  console.log();
  console.log("Enter 0, 1, or 2:");
  let promptInput = input.question("");
  promptInput = Number(promptInput);
  while(promptInput < 0 || promptInput > 3){
    console.clear();
    console.log("Please only enter 0, 1, or 2");
    promptInput = input.question("");
    promptInput = Number(promptInput);
  }
  console.clear();
  return Number(promptInput);
}

const oldScoreKey = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldScoreKey);

function simpleScore(word = ""){
  word = word.toLowerCase();
  let score = word.length;
  return score;
}

function bonusVowels(word = ""){
  word = word.toLowerCase().split("");
  let score = 0;
  let vowels = ['a','e','i','o','u'];
  for(i = 0; i < word.length; i++){
    if(vowels.includes(word[i]))
      score+=3;
    if(!vowels.includes(word[i])){
      score+=1;
    }
  }
  return score;
}

function scrabbleScore(word = "", charScorer = newPointStructure){
  word = word.toLowerCase().split("");
  let compare = Object.keys(charScorer);
  let score = 0;
  for(i = 0; i < word.length; i++){
    if(compare.includes(word[i])){
    score+=Number(charScorer[word[i]]);
    }
  }
  return score;
}

let simple = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore
}
let vowels = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: bonusVowels
}
let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore
}
let scoringAlgorithms = [simple, vowels, scrabble];

function illegalCharChecker(word){
  word = word.toLowerCase();
  let illChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', " ", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", ",", "-", "+", "=", "`", "~", "{", "}", "[", "]", ":", ";", '"', "'", "<", ">", ".", "/", "|", "*"]
  let check = word.split("");
  let status = false;
  for(i = 0; i < check.length; i++){
    if(word == "stop!"){break}
    if(illChar.includes(check[i])){
      status = true;
      break
    }
  }
  return status;
}

function runProgram(algorithims = scoringAlgorithms){
  let algChoice = initialPrompt();
  let word;
  let words = [];
  let score = 0;
  while(word !== "stop!"){
    console.log("Please enter a word:")
    console.log('(You may stop at any time by typing "stop!")')
    console.log();
    word = input.question("");
    while(illegalCharChecker(word)===true){
      console.clear();
      console.log("Please enter a single word without any numbers, or special characters.");
      word = input.question("");
    }
  
  if(word.toLowerCase()==="stop!"){break}
  console.clear();
  if(word === ""){
    console.log(`You didn't enter anything this turn.`)
  }
  else{
    console.log(`Score for '${word}': ${algorithims[algChoice].scoreFunction(word)}`)
  }
  words.push(word);
  score+= algorithims[algChoice].scoreFunction(word)
  console.log(`Total points scored: ${score}`)
  console.log("")
  console.log("");
  console.log("Press enter or type anything to play another word.");
  let cont = input.question(""); 
  if(cont === 'stop!'){break}
  console.clear();
  }

  console.clear();
  console.log(`You scored a total of ${score} points!`);
  console.log();
  console.log("Words used:");
  console.log(words.join(", "));
}
runProgram();


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

