// https://github.com/webpack-contrib/stylus-loader/blob/master/src/utils.js
// https://stylus-lang.com/
import Parser from "stylus/lib/parser";
import Evaluator from "stylus/lib/visitor/evaluator";
import Compiler from "stylus/lib/visitor/compiler";

export default function stylusLoader(source) {
  const options = {};

  // source->parser->ast
  const parser = new Parser(source, {});
  let ast;
  try {
    ast = parser.parse();
    // console.log("stylus", ast);
  } catch (error) {
    // console.log("stylus", error);
    return;
  }

  let firstNode = ast.first;
  if (!firstNode.val) {
    const evaluator = new Evaluator(ast);
    firstNode = evaluator.visit.call(evaluator, firstNode).first;
    // console.log("stylus firstNode", firstNode);
  }

  // ast->compiler->string
  const compiler = new Compiler(firstNode);
  const compileContent = compiler.compile();
  // console.log("stylus content", compileContent);
  return compileContent;
}

// var testCode = `

// font-size = 14px
// font-stack = "Lucida Grande", Arial, sans-serif

// body
//   font font-size font-stack

// .login-from
//   width 80%
//   text-align center
//   padding 10px
//   margin 0 auto
//   box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19)

//   .btn
//     text-align center
//     margin-top 10px

// .slide-enter-active, .slide-leave-active
//   transition all 0.5s

// .slide-enter, .slide-leave-to
//   opacity 0 `;
