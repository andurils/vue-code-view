<script>
import classNames from "classnames";

export default {
  name: "Footer",
  methods: {},
  render() {
    const prefixCls = "rc-footer";
    const theme = "dark";
    const className = "";
    const style = {};

    const footerClassName = classNames(`${prefixCls}`, className, {
      [`${prefixCls}-${theme}`]: !!theme,
    });
    return (
      <footer class={footerClassName} style={style}>
        {/*columns*/}
        <section class={`${prefixCls}-container`}>
          <section class={`${prefixCls}-columns`}>
            <div
              class={classNames(`${prefixCls}-column`, className)}
              style={style}
            >
              <h2>相关参考</h2>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://ant.design/index-cn"
                  class="footer-main-link"
                  target="_blank"
                >
                  Ant Design
                </a>

                <span class={`${prefixCls}-item-separator`}>-</span>
                <span class={`${prefixCls}-item-description`}>
                  企业级产品设计体系
                </span>
              </div>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://www.antdv.com/"
                  class="footer-main-link"
                  target="_blank"
                >
                  Ant Design Vue
                </a>
              </div>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://element.eleme.cn/"
                  class="footer-main-link"
                  target="_blank"
                >
                  Element
                </a>
              </div>
            </div>

            <div
              class={classNames(`${prefixCls}-column`, className)}
              style={style}
            >
              <h2>帮助</h2>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://github.com/andurils/vue-code-view"
                  class="footer-main-link"
                  target="_blank"
                >
                  <a-icon type="github" class={`${prefixCls}-item-icon`} />
                  GitHub
                </a>
              </div>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://github.com/andurils/vue-code-view/blob/main/CHANGELOG.zh-CN.md"
                  class="footer-main-link"
                  target="_blank"
                >
                  <a-icon type="history" class={`${prefixCls}-item-icon`} />
                  更新日志
                </a>
              </div>
              <div class={classNames(`${prefixCls}-item`, className)}>
                <a
                  href="https://github.com/andurils/vue-code-view/issues"
                  class="footer-main-link"
                  target="_blank"
                >
                  <a-icon type="bug" class={`${prefixCls}-item-icon`} />
                  报告 Bug
                </a>
              </div>
            </div>
          </section>
        </section>

        {/*bottom*/}
        <section class={`${prefixCls}-bottom`}>
          <div class={`${prefixCls}-bottom-container`}>
            Copyright © 2021-present
            <a target="_blank" href="https://github.com/andurils">
              Andurils
            </a>
          </div>
        </section>
      </footer>
    );
  },
};
</script>

<style lang="scss">
.rc-footer {
  position: relative;
  clear: both;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  line-height: 1.5;
  background-color: #000;

  a {
    transition: all 0.3s;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;

    &:hover {
      color: #40a9ff;
    }
  }

  &-container {
    width: 100%;
    max-width: 1200px;
    padding: 80px 0 20px;
    margin: auto;
  }

  &-columns {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  &-column {
    margin-bottom: 60px;
    margin-right: 32px;

    h2 {
      position: relative;
      margin: 0 auto 24px;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
    }

    &-icon {
      margin-right: 0.5em;
      width: 22px;
      display: inline-block;
      vertical-align: middle;
      top: -1px;
      position: relative;
      text-align: center;

      > span,
      > svg,
      img {
        width: 100%;
        display: block;
      }
    }
  }

  &-item {
    margin: 12px 0;

    &-icon {
      margin-right: 0.4em;
      width: 16px;
      display: inline-block;
      vertical-align: middle;
      // top: -1px;
      position: relative;
      text-align: center;

      > span,
      > svg,
      img {
        width: 100%;
        display: block;
      }
    }

    &-separator {
      margin: 0 0.3em;
    }
  }

  &-bottom {
    &-container {
      border-top: 1px solid rgba(255, 255, 255, 0.25);
      width: 100%;
      max-width: 1200px;
      text-align: center;
      margin: 0 auto;
      padding: 16px 0;
      line-height: 32px;
      font-size: 16px;
    }
  }

  &-light {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.85);

    h2,
    a {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  &-light &-bottom-container {
    border-top-color: #e8e8e8;
  }

  &-light &-item-separator,
  &-light &-item-description {
    color: rgba(0, 0, 0, 0.45);
  }
}

@media only screen and (max-width: 767.99px) {
  .rc-footer {
    text-align: center;

    &-container {
      padding: 40px 0;
    }

    &-columns {
      display: block;
    }

    &-column {
      display: block;
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
