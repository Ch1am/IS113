/* 
    Name:  
    Email: 
*/

// Exported function to check if two strings are anagrams
module.exports = function anagram(str1, str2) {

  // ADD YOUR CODE BELOW
  // Build character frequency objects for both strings
  const obj1 = buildCharObject(str1);
  const obj2 = buildCharObject(str2);
  console.log(obj1)

  // Get the list of keys (unique characters) from both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  console.log(keys1)

  // If the number of unique characters is different, not an anagram
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare character frequencies
  for (let char of keys1) {
    if (obj1[char] !== obj2[char]) {
      return false; // Mismatch found
    }
  }

  // All checks passed — it's an anagram
  return true;
};

// Helper function to build a character frequency object from a string
function buildCharObject(str) {
  // Remove spaces and convert to lowercase
  let cleanedStr = "";
  for (let char of str) {
    if (char !== " ") {
      cleanedStr += char.toLowerCase();
    }
  }

  const charObj = {};

  // Count occurrences of each character
  for (let char of cleanedStr) {
    charObj[char] = (charObj[char] || 0) + 1;
  }

  return charObj;

  // END OF ADDING YOUR CODE
}
