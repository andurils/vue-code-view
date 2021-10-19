// https://github.com/alexgorbatchev/less-compiler/blob/master/less-compiler.js

const path = require("path");
const less = require("less");

export const compiler = {
  fromSource: function (source, options) {
    var callback, parser, parserOpts, opts, src, toCssOpts, _i;
    opts = options || {};
    // parserOpts = {};
    // toCssOpts = {};
    // parserOpts.filename = opts.filename || "less-compiler";
    // parserOpts.paths = opts.paths || [path.dirname(parserOpts.filename)];
    // toCssOpts.cleancss = opts.cleancss;
    // toCssOpts.compress = opts.compress;
    // toCssOpts.ieCompat = opts.ieCompat;
    // toCssOpts.maxLineLen = opts.maxLineLen;
    // toCssOpts.outputSourceFiles = opts.outputSourceFiles;
    // toCssOpts.silent = opts.silent;
    // toCssOpts.sourceMap = opts.sourceMap;
    // toCssOpts.sourceMapBasepath = opts.sourceMapBasepath;
    // toCssOpts.sourceMapFilename = opts.sourceMapFilename;
    // toCssOpts.sourceMapOutputFilename = opts.sourceMapOutputFilename;
    // toCssOpts.sourceMapRootpath = opts.sourceMapRootpath || "";
    // toCssOpts.sourceMapURL = opts.sourceMapURL;
    // toCssOpts.strictMath = opts.strictMath;
    // toCssOpts.strictUnits = opts.strictUnits;
    // toCssOpts.verbose = opts.verbose;
    // parser = new less.Parser(parserOpts);
    parser = new less.Parser(parserOpts);
    let result = less.render(source, opts);
    console.log(result);
    return result;
  },
  //   fromFile: function () {},
};
