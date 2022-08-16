module.exports = md => {
  const RE = /^<(script|style)(?=(\s|>|$))/i

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    // const hoistedTags = md.$data.hoistedTags || (md.$data.hoistedTags = [])
    // https://vitepress.vuejs.org/guide/using-vue.html#script-style-hoisting
    const hoistedTags = []
    if (RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      return content
    }
  }
}
