<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header :is-home="isHome"></main-header>
    <div class="">
      <router-view
        :class="[
          {
            'markdown-body': $route.path === '/changelog',
          },
        ]"
      ></router-view>
    </div>
    <!-- 首页显示 -->
    <main-footer v-if="isHome || isChangelog"></main-footer>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    console.log(this.$route.path, this.$route.name);
  },
  computed: {
    isComponent() {
      // return /^component-/.test(this.$route.name || "");
      return this.$route.path.indexOf("component") > -1;
    },
    isRepl() {
      return this.$route.path.indexOf("repl") > -1;
    },
    isChangelog() {
      console.log(this.$route.name);
      return /^changelog/.test(this.$route.name || "");
    },
    isHome() {
      // return /^home/.test(this.$route.name || "");
      return this.$route.path.length <= 1;
    },
  },
};
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px;
}
</style>
