<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <!-- logo -->
        <template>
          <router-link :to="`/`">
            <!-- logo -->
            <slot>
              <img
                src="../assets/images/element-logo.svg"
                alt="element-logo"
                class="nav-logo"
              />
              <img
                src="../assets/images/element-logo-small.svg"
                alt="element-logo"
                class="nav-logo-small"
              />
            </slot>
          </router-link>
        </template>

        <!-- nav menu -->
        <ul class="nav">
          <li class="nav-item nav-item-theme">
            <router-link active-class="active" :to="`/demo`"
              >示例说明
            </router-link>
          </li>
          <li class="nav-item nav-item-theme">
            <router-link active-class="active" :to="`/md`"
              >组件说明
            </router-link>
          </li>
          <li class="nav-item nav-item-theme">
            <router-link active-class="active" :to="`/component`"
              >组件
            </router-link>
          </li>
          <li class="nav-item nav-item-theme">
            <router-link active-class="active" :to="`/changelog`"
              >更新日志
            </router-link>
          </li>

          <li class="nav-item nav-item-theme">
            <a
              href="https://github.com/andurils/vue-code-view"
              class="nav-git-logo"
              target="_blank"
              ><a-icon type="github"
            /></a>
          </li>
        </ul>
      </div>
    </header>

    <div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">logo</el-col>

        <el-col :span="6">menu</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "",
      verDropdownVisible: true,
      langDropdownVisible: true,
    };
  },

  components: {},

  computed: {
    isComponentPage() {
      return /^component/.test(this.$route.name);
    },
    isHome() {
      return /^home/.test(this.$route.name);
    },
  },
  mounted() {
    console.log(this.$route.path, this.$route.name);
  },
  methods: {},

  created() {},
};
</script>
<style lang="scss" scoped>
.header {
  min-width: 64px;
  height: 64px;
  line-height: 64px;

  // height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  // line-height: 80px;
  z-index: 100;
  position: relative;

  box-shadow: 0 2px 8px #f0f1f2;

  .container {
    height: 100%;
    box-sizing: border-box;
    width: 1140px;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #000000d9;
      display: block;
      padding: 0 22px;

      &.active,
      &:hover {
        color: #1989fa;
      }

      &.active::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: auto;
        right: 30px;
        left: 30px;
        height: 2px;
        background: #409eff;
      }
    }
  }

  .nav-git-logo {
    font-size: 20px;
  }
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
