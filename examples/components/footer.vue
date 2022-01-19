<script>
import classNames from "classnames";

export default {
  name: "Footer",
  data() {
    return {
      navList: [
        {
          title: "相关参考",
          urlList: [
            {
              title: "Ant Design",
              url: "https://ant.design/index-cn",
              desc: "企业级产品设计体系",
            },
            {
              title: "Ant Design Vue",
              url: "https://www.antdv.com/",
            },
            {
              title: "Element",
              url: "https://element.eleme.cn/",
            },
          ],
        },
        {
          title: "帮助",
          urlList: [
            {
              title: "GitHub",
              url: "https://github.com/andurils/vue-code-view",
              iconCls: "github",
            },
            {
              title: "更新日志",
              url: "https://github.com/andurils/vue-code-view/blob/main/CHANGELOG.zh-CN.md",
              iconCls: "history",
            },
            {
              title: "报告 Bug",
              url: "https://github.com/andurils/vue-code-view/issues",
              iconCls: "bug",
            },
          ],
        },
      ],
    };
  },
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
            {this.navList.map((item) => {
              const navItems = item.urlList.map((sItem) => {
                return (
                  <div class={classNames(`${prefixCls}-item`, className)}>
                    <a
                      href={sItem.url}
                      class="footer-main-link"
                      target="_blank"
                    >
                      {sItem.iconCls && (
                        <a-icon
                          type={sItem.iconCls}
                          class={`${prefixCls}-item-icon`}
                        />
                      )}
                      {sItem.title}
                    </a>
                    {sItem.desc && (
                      <span class={`${prefixCls}-item-separator`}>-</span>
                    )}
                    {sItem.desc && (
                      <span class={`${prefixCls}-item-description`}>
                        {sItem.desc}
                      </span>
                    )}
                  </div>
                );
              });

              return (
                <div
                  class={classNames(`${prefixCls}-column`, className)}
                  style={style}
                >
                  <h2>{item.title}</h2>
                  {navItems}
                </div>
              );
            })}
          </section>
        </section>

        {/*bottom*/}
        <section class={`${prefixCls}-bottom`}>
          <div class={`${prefixCls}-bottom-container`}>
            Copyright © 2021-present
            <a target="_blank" href="https://github.com/andurils">
              &nbsp; andurils
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
