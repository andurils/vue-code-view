const {
    slugify: defaultSlugify,
    resolveHeadersFromTokens
} = require("../utils");

module.exports = md => {
    const { level = [2, 3], slugify = defaultSlugify, format } = {};
    const render = md.renderer.render.bind(md.renderer);
    md.renderer.render = (tokens, options, env) => {
        env.headers = resolveHeadersFromTokens(tokens, {
            level,
            shouldAllowHtml: false,
            shouldEscapeText: false,
            slugify,
            format,
        });
        return render(tokens, options, env);
    };
}