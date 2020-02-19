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

const result = transform(definition)(inputObject) 
{
  name: 'john',
  age: 25,
  email: 'john@doe.com',
  phone: null
}

Also works with nested objects in definition files. For example:
===============
const definition = {
  name: 'name',
  meta: {
    email: 'details.contact.email'
  }
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

const result = transform(definition)(inputObject)
{
  name: 'john',
  meta: {
    email: 'john@doe.com'
  }
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
      typeof definition[key] === "string"
        ? pluck(definition[key])(inputObject)
        : transform(definition[key])(inputObject)
    ])
  );
};
