/* eslint-disable no-useless-escape */
<script>
export default {
  name: "HomeExample",
  data() {
    return {
      codeList: [
        {
          title: "简单组件",
          desc: "无需安装任何环境，打开页面快速体验交互细节。",
          height: 300,
          layout: "right",
          source: `<template>
  <div id="app">
    <img :src="src" style="width:60px;" />
    <h1>Welcome to Vue.js {{version}} !</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src:'https://cn.vuejs.org/images/logo.svg',
      version: '2.x'
    };
  },
};
<\/script>`,
        },

        {
          title: "Style 样式支持",
          desc: "支持样式编辑，同时支持 CSS 预处理sass、less。",
          layout: "left",
          height: 400,
          source: `<template>
  <div id="app">
    <img class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <div class="test" >scss support!</div>
    <div class="less-test" >less support!</div>
  </div>
</template>
<style>
.logo {
  width:66px;
}
</style>

<style lang='scss' >
$primary-color: red;

.test{
  color: $primary-color;
  font-size:32px;
}
</style>
<style lang='less' >
@width: 10px;
@height: @width + 10px;

.less-test {
  width: @width;
  height: @height;
  font-size:32px;
}
</style> `,
        },
      ],
    };
  },
  render() {
    return (
      <section class="examples">
        {this.codeList.map((item) => {
          return (
            <div class="example-wrapper">
              <div class="example-desc">
                <h3 class="title">{item.title}</h3>
                <div>{item.desc}</div>
              </div>
              <div class="react-live">
                <CodeViewer
                  source={item.source}
                  showCode
                  layout={item.layout}
                  height={item.height}
                  maxHeight={item.maxHeight}
                ></CodeViewer>
              </div>
            </div>
          );
        })}
      </section>
    );
  },
};
</script>

<style lang="scss">
.examples {
  margin-top: 20px;
  margin-bottom: 15px;
  .example-wrapper {
    margin-top: 40px;

    &:first-child {
      margin-top: 0;
    }
    .example-desc {
      flex: 0 0 33%;

      .title {
        margin-bottom: 20px;
        font-size: 25px;
        line-height: 1.3;
        font-weight: bold;
      }

      h3 {
        color: #282c34;
        max-width: 11em;
        padding-top: 0;

        &::before {
          content: " ";
          display: block;
          padding-top: 90px;
          margin-top: -45px;
        }
      }

      p {
        margin-top: 15px;
        margin-right: 40px;
        line-height: 1.7;
      }
    }

    .react-live {
      width: 100%;
    }
  }
}

@media (max-width: 1279px) {
  .example-desc {
    margin-bottom: 20px;
  }
}

@media (min-width: 1280px) {
  .example-desc p {
    margin-top: 25px;
  }

  .example-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 80px;
  }
}

@media (min-width: 780px) {
  .examples {
    margin-top: 60px;
    margin-bottom: 65px;
  }
}

@media (max-width: 979px) {
  .example-wrapper {
    display: block;
  }
}
</style>
