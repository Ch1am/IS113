// DO NOT MODIFY THIS PART

const anagram = require("./q4");

const testCases = [
  { input1: "orange", input2: "Genaro", expected: true },
  { input1: "friend", input2: "drained", expected: false },
  { input1: "javascript", input2: "jar pic vest", expected: false },
  { input1: "mrs jones", input2: "jessnorm", expected: true },
];

testCases.forEach((test, index) => {
  const actual = anagram(test.input1, test.input2);
  if (actual === test.expected) {
    console.log(`Test case ${index + 1}: Pass`);
  } else {
    console.log(`Test case ${index + 1}: Fail`);
    console.log(`    Input: "${test.input1}" & "${test.input2}"`);
    console.log(`    Expected: ${test.expected}, Got: ${actual}`);
  }
});

// DO NOT MODIFY THIS PART