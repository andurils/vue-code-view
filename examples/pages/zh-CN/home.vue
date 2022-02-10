<script>
import HomeBackground from "./home-background.vue";
import HomeCard from "./home-card.vue";
import HomeExample from "./home-example.vue";
export default {
  components: {
    HomeBackground,
    HomeCard,
    HomeExample,
  },
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods: {},

  render() {
    return (
      <div class="home-container">
        <div class="home-banner">
          <HomeBackground></HomeBackground>
          <div class="home-banner-holder">
            <div class="home-banner-content">
              <div>
                <div class="home-card-logo">Vue Code View</div>
              </div>
              <p>
                一个基于 Vue
                2，在网页中实时编辑运行代码、预览效果的轻量级代码交互组件。
              </p>

              <div class="home-banner-content-operations">
                <a-button type="primary" shape="round" size="large">
                  <router-link to={"/doc"}>开始使用</router-link>
                </a-button>
                <a-button shape="round" size="large" ghost>
                  <router-link to={"/repl"}>在线示例</router-link>
                </a-button>
              </div>
            </div>
          </div>
        </div>

        <div style=" max-width: 1256px; margin:  0 auto;">
          <div class="home-block-content">
            <HomeCard></HomeCard>
          </div>
        </div>

        <div style=" max-width: 1256px; margin:  0 auto;">
          <div class="home-block-content">
            <HomeExample></HomeExample>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/default.scss";
.home-container {
  max-width: 1280 px;

  .home-banner {
    position: relative;
    height: 512px;
    overflow: hidden;
    background: url("../../assets/images/home-bg.svg");
    background-size: cover;

    &-holder {
      position: relative;
      z-index: 1;
      margin-top: 160px;
    }

    &-content {
      margin: 0 auto;
      padding: 0 16px;
      font-size: 16px;
      text-align: center;

      p {
        margin: 16px 0 0;
        // font-weight: lighter;
        color: #000000d9;
      }

      &-operations {
        margin-top: 72px;
        white-space: nowrap;

        button.ant-btn {
          margin: 0 8px;
          height: auto;
          padding: 8px 24px;
          color: $home-color;
          font-size: 14px;
          border-color: $home-color;

          &:hover {
            color: mix(#ffffff, $home-color, 20%);
            border-color: mix(#ffffff, $home-color, 20%);
          }

          &.ant-btn-primary {
            color: #fff;
            background: $home-color;

            &:hover {
              background-color: mix(#ffffff, $home-color, 20%);
            }
          }
        }
      }
    }
  }

  .home-card-logo {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 600;
    font-size: 68px;
    color: #000000f5;
  }
}

.home-block-content {
  margin: 88px 40px 124px;

  h2.ant-typography {
    margin-bottom: 56px;
  }

  &-extra {
    float: right;
    padding-top: 12px;
    font-weight: 200;
    font-size: 16px;

    html.rtl & {
      float: left;
    }
  }
}

@media (min-width: $screen-sm-min) {
  .home-container {
    // height: 448px;

    &-holder {
      margin-top: 130px;
    }

    &-content {
      font-size: 16px;

      p {
        margin-top: 24px;
      }

      .video {
        margin: 8px auto;
      }

      &-operations {
        margin-top: 40px;

        button.ant-btn {
          font-size: 16px;
        }
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  .home-container {
    .home-card-logo {
      font-size: 32px;
    }
  }
}
</style>
