<script>
import HomeBackground from "./Background.vue";
import PicGuide from "@assets/images/guide.png";
import PicComponent from "@assets/images/component.png";
import PicThemeIndex from "@assets/images/theme-index-icon.svg";
import PicResource from "@assets/images/resource.png";
export default {
  components: {
    HomeBackground,
  },
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods: {},

  render() {
    return (
      <div class="home-wrapper">
        <div class="home-banner">
          <home-background></home-background>
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
                  <router-link to={"/component"}>开始使用</router-link>
                </a-button>
                <a-button shape="round" size="large" ghost>
                  <router-link to={"/demo"}>在线示例</router-link>
                </a-button>
              </div>
            </div>
          </div>
        </div>

        <div class="cards">
          <div class="container">
            <div class="card">
              <img src={PicGuide} alt="" />
              <h3>轻量</h3>
              <p>无需安装任何环境，打开页面快速体验交互细节。</p>
            </div>
            <div class="card">
              <img src={PicComponent} alt="" />
              <h3>交互</h3>
              <p>
                在线代码编辑器，支持代码高亮、光标行背景高亮、括号/标签匹配自动关闭、代码折叠。
              </p>
            </div>
            <div class="card">
              <img src={PicThemeIndex} alt="" />
              <h3>实时</h3>
              <p>实时预览代码编辑效果。</p>
            </div>
            <div class="card">
              <img src={PicResource} alt="" />
              <h3>Markdown</h3>
              <p>支持 Markdown 示例实时渲染</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/default.scss";
.home-wrapper {
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

  .cards {
    margin: 0 auto;
    max-width: 1280px;

    .container {
      padding: 0;
      margin: 80px 40px;

      display: flex;
      align-items: center;

      .card {
        cursor: pointer;
        height: 430px;
        width: 100%;
        background: #ffffff;
        border: 1px solid #eaeefb;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        transition: all 0.3s ease-in-out;
        bottom: 0;
        margin-right: 16px;

        img {
          width: 160px;
          height: 120px;
          margin: 66px auto;
        }
        h3 {
          margin: 0;
          font-size: 18px;
          color: #1f2f3d;
          font-weight: normal;
        }
        p {
          font-size: 14px;
          color: #99a9bf;
          padding: 0 25px;
          line-height: 20px;
        }
        &:hover {
          bottom: 6px;
          box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

@media (min-width: $screen-sm-min) {
  .home-banner {
    height: 448px;

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
  .home-wrapper {
    .home-card-logo {
      font-size: 32px;
    }
  }
}
</style>
