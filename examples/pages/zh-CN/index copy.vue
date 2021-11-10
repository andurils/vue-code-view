<template>
  <div>
    <div className="home-banner-background"></div>
    <div class="banner">
      <div class="banner-desc">
        <h1>轻量级代码实时交互组件</h1>
        <p>
          Vue Code View,一个基于 Vue 2
          的轻量代码交互组件，在网页中实时编辑运行代码、预览效果的轻量展示组件。
        </p>
      </div>
    </div>
    <div style="min-height: 60px"></div>
    <!-- code-viewer -->

    <div class="cards">
      <ul class="container">
        <li>
          <div class="card">
            <img src="@assets/images/guide.png" alt="" />
            <h3>轻量</h3>
            <p>无需安装任何环境，打开页面快速体验交互细节。</p>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="@assets/images/component.png" alt="" />
            <h3>交互</h3>
            <p>
              在线代码编辑器，支持代码高亮、光标行背景高亮、括号/标签匹配自动关闭、代码折叠。
            </p>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="@assets/images/theme-index-icon.svg" alt="" />
            <h3>实时</h3>
            <p>实时预览代码编辑效果。</p>
          </div>
        </li>
        <li>
          <div class="card">
            <img src="@assets/images/resource.png" alt="" />
            <h3>Markdown</h3>
            <p>支持 Markdown 示例实时渲染</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { throttle } from "throttle-debounce";

export default {
  created() {
    this.throttledHandleScroll = throttle(10, true, (index) => {
      this.handleScroll(index);
    });
  },
  methods: {
    handleScroll(index) {
      const ele = this.$refs.indexMainImg;
      const rect = ele.getBoundingClientRect();
      const eleHeight = ele.clientHeight + 55;
      let calHeight = (180 - rect.top) * 2;
      if (calHeight < 0) calHeight = 0;
      if (calHeight > eleHeight) calHeight = eleHeight;
      this.mainImgOffset = calHeight;
    },
  },
  data() {
    return {
      lang: this.$route.meta.lang,
      mainImgOffset: 0,
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttledHandleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.throttledHandleScroll);
  },
};
</script>

<style lang="scss" scoped>
.banner {
  text-align: center;
}
.banner-desc {
  padding-top: 50px;
  h1 {
    font-size: 34px;
    margin: 0;
    line-height: 48px;
    color: #555;
  }

  p {
    font-size: 18px;
    line-height: 28px;
    color: #888;
    margin: 10px 0 5px;
  }
}
.sponsors {
  display: flex;
  justify-content: center;
}
.sponsor {
  margin: 0 20px 50px;
  display: inline-flex;
  width: 300px;
  height: 100px;
  justify-content: center;

  img {
    margin-right: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: #999;
    font-size: 14px;
  }
}
.jumbotron {
  width: 890px;
  margin: 30px auto;
  position: relative;
  img {
    width: 100%;
  }
  .jumbotron-red {
    transition: height 0.1s;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
}
.cards {
  margin: 0 auto 110px;
  width: 1140px;

  .container {
    padding: 0;
    margin: 0 -11px;
    width: auto;
    &::before,
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }

  li {
    width: 25%;
    padding: 0 19px;
    box-sizing: border-box;
    float: left;
    list-style: none;
  }

  img {
    width: 160px;
    height: 120px;
  }
}
.card {
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

  img {
    margin: 66px auto 60px;
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
  a {
    height: 53px;
    line-height: 52px;
    font-size: 14px;
    color: #409eff;
    text-align: center;
    border: 0;
    border-top: 1px solid #eaeefb;
    padding: 0;
    cursor: pointer;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    transition: all 0.3s;
    text-decoration: none;
    display: block;

    &:hover {
      color: #fff;
      background: #409eff;
    }
  }
  &:hover {
    bottom: 6px;
    box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
  }
}
@media (max-width: 1140px) {
  .cards {
    width: 100%;
    .container {
      width: 100%;
      margin: 0;
    }
  }
  .banner .container {
    width: 100%;
    box-sizing: border-box;
  }
  .banner img {
    right: 0;
  }
}

@media (max-width: 1000px) {
  .banner .container {
    img {
      display: none;
    }
  }
  .jumbotron {
    display: none;
  }
}

@media (max-width: 768px) {
  .cards {
    li {
      width: 80%;
      margin: 0 auto 20px;
      float: none;
    }
    .card {
      height: auto;
      padding-bottom: 54px;
    }
  }
  .banner-stars {
    display: none;
  }
  .banner-desc {
    #line2 {
      display: none;
    }
    h2 {
      font-size: 32px;
    }
    p {
      width: auto;
    }
  }
}
.theme-intro-b {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  .intro-banner {
    position: absolute;
  }
  img {
    width: 300px;
  }
  .title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      padding: 0;
      margin: 10px 0;
    }
  }
}
.theme-intro-a {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
  }
  .intro-banner {
    top: 50%;
    left: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    text-align: center;
    z-index: 100;
    img {
      width: 100%;
    }
    .intro-text {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      p {
        padding: 0;
        margin: 0;
        font-size: 48px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
</style>
