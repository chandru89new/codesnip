/*
get key value of a given object.
if key does not exist in object, returns null
if object is null or undefined, returns null (instead of JS's usual error)
returns value or null
*/
const getKeyVal = key => obj => {
  if (!obj || !key) return null;
  if (!obj.hasOwnProperty(key)) return null;
  return obj[key];
};
