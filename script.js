// Assignment Code
var generateBtn = document.querySelector("#generate");

// VARIALBLES
//---------------------------------------------------------------------------------------------
var indexes = [];

// Character Types
const types = ["special", "numeric", "lowercase", "uppercase"];
const characters = [
  [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
]

// FUNCTIONS
//---------------------------------------------------------------------------------------------
// Select a random number between 0 to (max - 1)
function pickRandom(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

// Select a random character from a type
function selectRandomChar(arr) {
  var numOfTypes = arr.length;
  var indexOfType = arr[pickRandom(numOfTypes)];
  var numOfChars = characters[indexOfType].length;
  var randomChar = characters[indexOfType][pickRandom(numOfChars)];
  return randomChar;
}

// Find minimun character type in password
function findMinChars(indexesArr) {
  var minChars = [];

  for (var i = 0; i < indexesArr.length; i++) {
    minChars.push(selectRandomChar([indexesArr[i]]));
  }
  return minChars;
}

// Iterate all prompt criterias to include in the password
function promptCriterias(typesArr) {
  var userInput = true;
  var typesSelected = [];

  for (var i = 0; i < typesArr.length; i++) {
    userInput = confirm("Click OK to confirm including " + typesArr[i] + " characters?");

    if (userInput === true) {
      typesSelected.push(types.indexOf(typesArr[i]));
    }
  }
  return typesSelected;
}

//Generate password chars and locate min Charaters Types in
function findPwChars(mChars, pwL) {
  var pwGenerated = [];
  // Find position of minimun character type in password
  var posMinChars = pickRandom(pwL - indexes.length);

  // Find random chars and append to password array
  for (var i = 0; i < pwL; i++) {

    // Insert minimum characters in password
    if (posMinChars === i) {
      pwGenerated.push(mChars);
      i = i + mChars.length - 1;
    } else {
      //Insert random characters
      pwGenerated.push(selectRandomChar(indexes));
    }
  }
  return pwGenerated.join('');
}

// Validate numeric input from user
function promptPasswordLength() {
  var pw = "";
  var i = 0;

  do {
    // Check If message was promted for first time
    if (i === 0) {
      pw = prompt("How many characters would you like your password to contain?");
      i++
    } else {
      pw = prompt("Enter a valid number. Password legth must be between 8 to 128.");
    }

    // Check if user pressed Cancel 
    if (pw === null) {
      return;
    }

    // Chech if user entered invalid value
  } while (pw < 8 || pw > 128 || isNaN(pw));

  return pw;
}

// GENERATE PASSWORD FUNCTION
function generatePassword() {

  // Prompt length of password
  var pwLength = promptPasswordLength();

  // Check if user pressed cancel when prompted for password length
  if (pwLength === undefined) {
    return;
  }

  // Get criterias selected from user
  indexes = promptCriterias(types);

  // Generate minimun characters to include in password
  minCharTypes = findMinChars(indexes).join('');

  return findPwChars(minCharTypes, pwLength);
}


// ORIGINAL CODE
//---------------------------------------------------------------------------------------------
// Write password to the #password input
function writePassword() {
  var password = generatePassword();

  // ADDED - Check if user pressed cancel when prompted for password length
  if (password === undefined) {
    return;
  }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
