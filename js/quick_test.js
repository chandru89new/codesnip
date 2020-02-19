/*
simple function to run an array of functions for rapid testing/quick testing

Example usage:
==============

// define a function
const fn = (a) => return a

// define tests to run. the `eval` is the actual function call to test
const tests = [
  { description: 'some description': eval: "fn(arg)" }
]

// call the runtest function, passing tests as the argument
runtests(tests)
*/

const runtests = tests => {
  if (!Array.isArray(tests) || !tests.length)
    throw new Error("tests needs to be an array or needs to have some tests");
  for (test of tests) {
    console.log("Test: " + test.description);
    console.log(eval(test.eval));
    console.log("-----------------------");
  }
};
