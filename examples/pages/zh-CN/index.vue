<script>
import Logo from "@assets/images/element-logo.svg";
import HomeBackground from "./Background.vue";
export default {
  components: {
    HomeBackground,
  },
  name: "MainHeader",
  props: {
    isHome: { type: Boolean, default: false },
  },
  data() {
    return {
      classs: ["demo-container"], // page class
    };
  },
  mounted() {},
  methods: {},

  render() {
    const { isHome } = this;

    return (
      <div class="home-banner">
        <home-background></home-background>

        <div class="home-banner-holder">
          <div class="home-banner-content">
            <div>
              <div class="home-card-logo">xxxxxxxxxxxx</div>
            </div>
            <p>企业级产品设计体系，创造高效愉悦的工作体验</p>

            <div class="home-banner-content-operations">
              <a-button type="primary" shape="round" size="large">
                开始使用
              </a-button>
              <a-button shape="round" size="large" ghost>
                在线示例
              </a-button>
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
$home-color: #0170fe;

.home-banner {
  position: relative;
  height: 512px;
  overflow: hidden;
  // background: radial-gradient(rgba(255, 255, 255, 0.5), rgba(235, 245, 255, 0.58)),
  // linear-gradient(150deg, #fbfcfd, #f8fcff);
  background: url("https://gw.alipayobjects.com/zos/basement_prod/a8cf2dfe-ff6a-4a2e-ab73-f72dced0df99.svg");
  background-size: cover;

  &-holder {
    position: relative;
    z-index: 1;
    margin-top: 160px;
  }

  &-content {
    margin: 0 auto;
    padding: 0 16px;
    font-size: 14px;
    text-align: center;

    p {
      margin: 16px 0 0;
      font-weight: lighter;
    }

    .banner-video {
      display: none;
      margin: 20px auto 0;
      color: $home-color;
    }

    .banner-qr {
      margin: 8px auto 0;
      font-weight: normal;
      text-align: center;

      a {
        color: #0170fe;
      }

      img {
        display: inline-block;
        width: 18px;
        margin-right: 8px;
        vertical-align: text-bottom;

        .rtl & {
          margin-right: 0;
          margin-left: 8px;
        }
      }
    }

    &-operations {
      margin-top: 72px;
      white-space: nowrap;

      a {
        margin: 0 8px;
      }

      button.ant-btn {
        height: auto;
        padding: 8px 24px;
        color: $home-color;
        font-size: 14px;
        border-color: $home-color;

        &:hover {
          color: tint($home-color, 20%);
          border-color: tint($home-color, 20%);
        }

        &.ant-btn-primary {
          color: #fff;
          background: $home-color;

          &:hover {
            background-color: tint($home-color, 20%);
          }
        }
      }
    }
  }
}

.banner-qr-code {
  .ant-popover-inner-content {
    padding: 12px;
  }

  img {
    width: 136px;
    height: 136px;
  }

  p {
    margin: 8px 0 0;
    color: #314659;
    text-align: center;
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
</style>
