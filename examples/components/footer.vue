<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <h4>帮助</h4>
        <a
          href="https://github.com/andurils/vue-code-view"
          class="footer-main-link"
          target="_blank"
          ><a-icon type="github" /> GitHub</a
        >
        <a
          :href="`https://github.com/andurils/vue-code-view/blob/main/CHANGELOG.zh-CN.md`"
          class="footer-main-link"
          target="_blank"
          ><a-icon type="history" /> 更新日志</a
        >
        <a
          href="https://github.com/andurils/vue-code-view/issues"
          class="footer-main-link"
          target="_blank"
          ><a-icon type="bug" /> 报告 Bug</a
        >
      </div>
    </div>
    <section class="rc-footer-bottom">
      <div class="rc-footer-bottom-container">
        Made with <span style="color: rgb(255, 0, 0)">❤</span> by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/andurils"
          >Andurils</a
        >
      </div>
    </section>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #000;
  // background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px 0 150px;
  margin-top: -340px;
  box-sizing: border-box;
  height: 340px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .container {
    box-sizing: border-box;
    max-width: 1280px;
  }

  .footer-main {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    margin-right: 110px;

    h4 {
      font-size: 18px;
      // color: #333;
      color: #fff;
      line-height: 1;
      margin: 0 0 15px 0;
    }

    .footer-main-link {
      display: block;
      margin: 0;
      line-height: 2;
      font-size: 14px;
      // color: #666;
      color: #ffffffe6;

      &:hover {
        color: #40a9ff;
      }
    }
  }
}

.rc-footer-bottom {
  display: flex;
  color: #fff6;
  padding: 30px 60px 0 60px;
  justify-content: center;
}

.rc-footer-bottom-container {
  width: 1140px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  text-align: center;
  margin: 0 auto;
  padding: 16px 0;
  line-height: 32px;
  font-size: 16px;

  a {
    transition: all 0.3s;
    color: #ffffffe6;
    text-decoration: none;
  }
}

@media (max-width: 1140px) {
  .footer {
    height: auto;
  }
}

@media (max-width: 1000px) {
  .footer-social {
    display: none;
  }
}

@media (max-width: 768px) {
  .footer {
    .footer-main {
      margin-bottom: 30px;
    }
  }
}
</style>
