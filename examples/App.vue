<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header :is-home="isHome"></main-header>
    <div class="main-cnt">
      <router-view
        :class="[
          {
            'markdown-body': $route.path === '/changelog',
          },
          {
            'page-container ':
              $route.path === '/md' || $route.path === '/changelog',
          },
        ]"
      ></router-view>
    </div>
    <!-- 首页显示 -->
    <main-footer v-if="!isComponent"></main-footer>
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
