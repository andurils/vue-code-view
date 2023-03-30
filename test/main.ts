
import Vue, { h, watchEffect } from "vue";
import { Repl, ReplStore } from '../src'

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const store = new ReplStore({
      serializedState: location.hash.slice(1),
      showOutput: query.has('so'),
      outputMode: query.get('om') || 'preview',
      // defaultVueRuntimeURL: `${location.origin}/src/vue-dev-proxy`,
      // defaultVueServerRendererURL: `${location.origin}/src/vue-server-renderer-dev-proxy`,
      // defaultVueRuntimeURL: import.meta.env.PROD
      //   ? undefined
      //   : `${location.origin}/src/vue-dev-proxy`,
      // defaultVueServerRendererURL: import.meta.env.PROD
      //   ? undefined
      //   : `${location.origin}/src/vue-server-renderer-dev-proxy`
    })

    watchEffect(() => history.replaceState({}, '', store.serialize()))

    // setTimeout(() => {
    //   store.setFiles(
    //     {
    //       'index.html': '<h1>yo</h1>',
    //       'main.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //       'foo.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //       'bar.js': 'document.body.innerHTML = "<h1>hello</h1>"',
    //       'baz.js': 'document.body.innerHTML = "<h1>hello</h1>"'
    //     },
    //     'index.html'
    //   )
    // }, 1000);

    // store.setVueVersion('3.2.8')

    return () =>
      h(Repl, {
        props: {
          store,
          // layout: 'vertical',
          ssr: false,
          // sfcOptions: {
          //   script: {
          //     // inlineTemplate: false
          //   }
          // }
          // showCompileOutput: false,
          // showImportMap: false
        }
      })
  }
}
new Vue({
  render: App.setup(),
}).$mount('#app');