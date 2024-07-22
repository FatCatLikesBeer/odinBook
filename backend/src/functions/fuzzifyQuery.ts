// fuzzifyQuery.ts
// This function takes 2 arguments, an object 'queryOptions' and the 'sequalize' module operators object, 'Op'
// This function threads them together to return an object with the correct operators
// to allow the 'findAll()' method to do a fuzzy SQL match query.

export function fuzzifyQuery(queryOptions: any, Op: any) {
  let result = queryOptions;
  const keys = Object.keys(queryOptions);
  keys.forEach((key) => {
    result[key] = {
      [Op.like]: `%${result[key]}%`
    }
  });
  return result;
}
