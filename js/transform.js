/*

definition = {
  "keyInOutputObject": "key/path-InInputObject"
}

Example:
const definition = {
  name: 'name',
  age: 'meta.age',
  email: 'details.contact.email',
  phone: 'details.contact.phone'
}

const inputObject = {
  name: 'john',
  meta: {
    age: 25
  },
  details: {
    contact: {
      email: 'john@doe.com'
    }
  }
}

const result = extract(definition)(inputObject) 
{
  name: 'john',
  age: 25,
  email: 'john@doe.com',
  phone: null
}

*/

const getKeyVal = key => obj => {
  if (!obj || !key) return null;
  if (!obj.hasOwnProperty(key)) return null;
  return obj[key];
};

const pluck = path => object => {
  if (!path) return null;
  const keys = path.split(".").length ? path.split(".") : [path];
  return keys.reduce((acc, nextKey) => getKeyVal(nextKey)(acc), object);
};

const transform = definition => inputObject => {
  return Object.fromEntries(
    Object.keys(definition).map(key => [
      key,
      pluck(definition[key])(inputObject)
    ])
  );
};

/* TEST */

const runtests = tests => {
  for (test of tests) {
    console.log("Test: " + test.description);
    console.log(eval(test.eval));
    console.log("---------------");
  }
};

const mockInputObject = {
  name: "john",
  meta: {
    age: 25
  },
  details: {
    contact: {
      email: "john@doe.com"
    }
  }
};

const mockDefinition = {
  name: "name",
  age: "meta.age",
  email: "details.contact.email",
  phone: "details.contact.phone"
};

const tests = [
  {
    description: "getkeyval with valid values",
    eval: 'getKeyVal("meta")(mockInputObject)'
  },
  {
    description: "testing pluck with valid values",
    eval: "pluck('details.contact.email')(mockInputObject)"
  },
  { description: "testing pluck with null object", eval: "pluck('key')(null)" },
  {
    description: "testing pluck with null key",
    eval: "pluck(null)(mockDefinition)"
  },
  {
    description: "testing transform with valid values",
    eval: "transform(mockDefinition)(mockInputObject)"
  }
];

runtests(tests);
