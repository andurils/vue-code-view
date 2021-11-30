export default async function lessLoader(source) {
  let lessOptions = {};
  let result;
  try {
    let resolvedImplementation = require("less");
    result = await resolvedImplementation.render(source, lessOptions);
  } catch (error) {
    return;
  }

  return result;
}
