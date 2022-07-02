<script lang="ts">
import { defineComponent, computed } from "vue";
import { useData } from "@examples/composables/config";

interface Feature {
  title?: string;
  details?: string;
}

export default defineComponent({
  setup() {
    const { frontmatter } = useData();

    const hasFeatures = computed(() => {
      return frontmatter.features && frontmatter.features.length > 0;
    });

    const features = computed<Feature[]>(() => {
      return frontmatter.features ? frontmatter.features : [];
    });
    return {
      hasFeatures,
      frontmatter,
      features,
    };
  },
});
</script>

<template>
  <div v-if="hasFeatures" class="home-features">
    <div class="wrapper">
      <div class="container">
        <div class="features">
          <section
            v-for="(feature, index) in features"
            :key="index"
            class="feature"
          >
            <h2 class="title" v-if="feature.title">{{ feature.title }}</h2>
            <p class="details" v-if="feature.details">{{ feature.details }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-features {
  margin: 0 auto;
  padding: 2.5rem 0 2.75rem;
  max-width: 960px;
  color: var(--vt-c-text-2);
}

.home-hero + .home-features {
  padding-top: 0;
}

@media (min-width: 420px) {
  .home-features {
    padding: 3.25rem 0 3.5rem;
  }

  .home-hero + .home-features {
    padding-top: 0;
  }
}

@media (min-width: 720px) {
  .home-features {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}

.wrapper {
  padding: 0 1.5rem;
}

.home-hero + .home-features .wrapper {
  border-top: 1px solid var(--c-divider);
  padding-top: 2.5rem;
}

@media (min-width: 420px) {
  .home-hero + .home-features .wrapper {
    padding-top: 3.25rem;
  }
}

@media (min-width: 720px) {
  .wrapper {
    padding-right: 0;
    padding-left: 0;
  }
}

.container {
  margin: 0 auto;
  max-width: 392px;
}

@media (min-width: 720px) {
  .container {
    max-width: 960px;
  }
}

.features {
  display: flex;
  flex-wrap: wrap;
  margin: -20px -24px;
  background-color: transparent;
}

.feature {
  flex-shrink: 0;
  padding: 20px 24px;
  width: 100%;
}

@media (min-width: 720px) {
  .feature {
    width: calc(100% / 3);
  }
}

.title {
  margin: 0 0 0.75em 0;
  border-bottom: 0;
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 600;

  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
}

@media (min-width: 420px) {
  .title {
    font-size: 1.4rem;
  }
}

.details {
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
  color: var(--c-text-light);
}

.title + .details {
  padding-top: 0.25rem;
}

@media (max-width: 576px) {
  .title {
    margin-bottom: 0.6em;
  }
  .feature {
    padding: 20px 32px;
  }
}
</style>
