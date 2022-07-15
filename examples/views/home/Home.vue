<script lang="ts">
import { defineComponent } from "vue";
import _HomeHero from "./HomeHero.vue";
import _HomeFeatures from "./HomeFeatures.vue";
import _NewsLetter from "./NewsLetter.vue";
import HomeExamples from "./HomeExamples.vue";

export default defineComponent({
  name: "HomeMain",
  components: {
    HomeHero: _HomeHero as any,
    HomeFeatures: _HomeFeatures as any,
    NewsLetter: _NewsLetter as any,
    HomeExamples,
  },
});
</script>

<template>
  <div class="home" aria-labelledby="main-title">
    <HomeHero />
    <HomeFeatures />
    <HomeExamples />
    <NewsLetter />
  </div>
</template>

<style scoped>
.home {
  padding-top: var(--header-height);
}
</style>
