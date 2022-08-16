export default async function lessLoader(source) {
  try {
    require.resolve("less");
  } catch (ignoreError) {
    console.log("Failed to resolve loader: less ！You may need to install it.");
  }

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
