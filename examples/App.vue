<template>
  <div id="app">
    <div class="page-header">
      <div class="page-title__main page-title--shadow">Vue Code View</div>
      <div class="page-title__sub">
        🌈 A code editor component based on Vue.js 2, compile source code (SFC)
        and render it in real time. 🖖
      </div>
    </div>
    <div id="nav">
      <router-link to="/">演示示例</router-link> |
      <router-link to="/md">说明文档</router-link> |
      <router-link to="/changelog">更新日志</router-link>
    </div>
    <router-view
      :class="[
        {
          'markdown-body': $route.path === '/changelog' || $route.path === '/',
        },
        {
          'page-container ': $route.path === '/md',
        },
      ]"
    />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
//  区域 title
.page-header {
  text-align: center;
  background: hsl(0, 50%, 45%);
  color: white;

  .page-title__main {
    // padding: 12px 0;
    // font-style: normal;
    font-size: clamp(2rem, calc(2rem + 1.2vw), 3rem);
    font-weight: 700;
    line-height: 1.7;
  }
  .page-title__sub {
    font-family: "Goudy Old Style", Garamond;
    // font-style: normal;
    font-size: 32px;
    line-height: 1.7;
  }
  .page-title--shadow {
    // color: white;
    // background: hsl(0, 50%, 45%);
    text-shadow: 1px 1px black, 2px 2px black, 3px 3px black, 4px 4px black,
      5px 5px black, 6px 6px black, 7px 7px black, 8px 8px black;
  }
}
#nav {
  min-width: 200px;
  max-width: 980px;
  margin: 24px auto;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media only screen and (max-height: 600px) {
  .page-header {
    display: none !important;
  }
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
