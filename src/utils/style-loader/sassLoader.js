// https://github.com/webpack-contrib/sass-loader/blob/master/src/utils.js
export default function sassLoader(source) {
  try {
    require.resolve("sass");
  } catch (ignoreError) {
    console.log(
      "Failed to resolve loader: dart-sass！You may need to install it."
    );
  }

  let sassOptions = {
    style: "expanded",
    alertColor: false,
  };

  let result;

  try {
    const implementation = require("sass");
    result = implementation.compileString(source, sassOptions);
  } catch (ignoreError) {
    // return;
  }
  return result;
}
