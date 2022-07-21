// https://github.com/webpack-contrib/stylus-loader/blob/master/src/index.js
export default function stylusLoader(source) {
  try {
    require.resolve("stylus");
  } catch (ignoreError) {
    console.log(
      "Failed to resolve loader: stylus！You may need to install it."
    );
  }

  let stylusOptions = {
    // style: "expanded",
    // alertColor: false,
  };

  let result;

  try {
    const { Parser, Evaluator, Normalizer, Compiler } = require("stylus");
    var parser = new Parser(source, stylusOptions);
    // parse
    var ast = parser.parse();
    // evaluate
    var evaluator = new Evaluator(ast, stylusOptions);
    ast = evaluator.evaluate();
    // normalize
    var normalizer = new Normalizer(ast, stylusOptions);
    ast = normalizer.normalize();
    // compile
    var compiler = new Compiler(ast, stylusOptions);
    result = compiler.compile();

    // console.log("stylus", css);
  } catch (err) {
    console.log(err);
  }

  return result;
}
