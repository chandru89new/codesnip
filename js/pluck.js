/*
plucks a specific key defined as a path from a given object
Example:

let user = { name: 'john', contact: { phone: 23414 } 
pluck('contact.phone')(user) // 23414
*/
const pluck = path => object => {
  if (!path) return null;
  const keys = path.split(".").length ? path.split(".") : [path];
  return keys.reduce((acc, nextKey) => getKeyVal(nextKey)(acc), object);
};
