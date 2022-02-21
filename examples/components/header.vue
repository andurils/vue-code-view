<script>
import Logo from "@assets/images/vcv-logo.svg";
// import LogoSmall from "@assets/images/element-logo-small.svg";
export default {
  name: "Header",
  props: {
    isHome: { type: Boolean, default: false },
  },
  data() {
    return {
      selectedMenuKey: "",
      popoverVisible: false,
    };
  },
  mounted() {},
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    changeSelectedMenu(key) {
      this.selectedMenuKey = key;
      this.popoverVisible = false;
    },
    getMenu(menuMode = "horizontal") {
      return (
        <a-menu
          id="nav"
          mode={menuMode}
          onClick={({ key }) => this.changeSelectedMenu(key)}
          selectedKeys={[this.isHome ? "" : this.selectedMenuKey]}
        >
          <a-menu-item key="repl">
            <router-link active-class="active" to={`/repl`}>
              REPL
            </router-link>
          </a-menu-item>
          <a-menu-item key="component">
            <router-link active-class="active" to={`/doc`}>
              文档
            </router-link>
          </a-menu-item>
          <a-menu-item key="changelog">
            <router-link active-class="active" to={`/changelog`}>
              更新日志
            </router-link>
          </a-menu-item>
        </a-menu>
      );
    },
  },

  render() {
    const { isHome, selectedMenuKey } = this;

    return (
      <transition>
        <header id="header" class={["clearfix", isHome ? "home-header" : ""]}>
          {/*responsive menu*/}
          <a-popover
            placement="bottomRight"
            trigger="click"
            v-model={this.popoverVisible}
          >
            <template slot="content">
              <div class="popover-menu">{this.getMenu("vertical")}</div>
            </template>
            <a-icon type="unordered-list" class="nav-phone-icon" />
          </a-popover>

          {/*nav*/}
          <a-row>
            {/*left logo*/}
            <a-col xs={24} sm={24} md={8} lg={6} xl={5} xxl={4}>
              <h1>
                <router-link to={"/"} id="logo">
                  <slot>
                    <img src={Logo} alt="vue-code-view" class="nav-logo" />
                  </slot>
                </router-link>
              </h1>
            </a-col>
            {/*right  menu*/}
            <a-col
              class="menu-row"
              xs={0}
              sm={0}
              md={16}
              lg={18}
              xl={19}
              xxl={20}
            >
              {this.getMenu("horizontal")}
              {/*menu-item-github*/}
              <a
                href="https://github.com/andurils/vue-code-view"
                class="nav-git-logo"
                target="_blank"
              >
                <a-icon type="github" />
              </a>
            </a-col>
          </a-row>
        </header>
      </transition>
    );
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/default.scss";

#header {
  position: relative;
  z-index: 10;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(240, 241, 242, 65);

  // ===================== Home Page =====================
  &.home-header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
    background: transparent;
    box-shadow: none;

    #logo {
      padding-right: 16px;
      padding-left: 40px;
    }

    .ant-menu {
      background: transparent;
    }
  }

  h1 {
    margin: 0;
    font-weight: normal;
  }

  .menu-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;

    > * {
      flex: none;
      margin: 0 12px 0 0;

      &:last-child {
        margin-left: 12px;
        margin-right: 40px;
      }
    }

    .nav-git-logo {
      color: #000000;
      font-size: 20px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

#nav {
  height: 100%;
  font-size: 14px;
  border: 0;

  &.ant-menu-horizontal {
    border-bottom: none;

    & > .ant-menu-item,
    & > .ant-menu-submenu {
      min-width: (40px + 12px * 2);
      height: $header-height;
      padding-right: 12px;
      padding-left: 12px;
      line-height: $header-height;

      a {
        color: #000000d9;
      }

      &::after {
        top: 0;
        right: 12px;
        bottom: auto;
        left: 12px;
        border-width: $menu-item-border;
      }
    }

    & .ant-menu-submenu-title .anticon {
      margin: 0;
    }

    & > .ant-menu-item-selected {
      a {
        color: #1890ff;
      }
    }
  }

  & > .ant-menu-item,
  & > .ant-menu-submenu {
    text-align: center;
  }
}

#logo {
  height: $header-height;
  padding-left: 40px;
  overflow: hidden;
  font-weight: bold;
  font-size: 18px;
  line-height: $header-height;
  letter-spacing: -0.18px;
  white-space: nowrap;
  text-decoration: none;

  img {
    height: 24px;
    margin-right: 12px;
  }
}

.nav-phone-icon {
  position: absolute;
  top: 25px;
  right: 30px;
  font-size: 18px;
  color: #000000;
  z-index: 1;
  display: none;
  // width: 16px;
  height: 22px;
  cursor: pointer;
}

// Popover menu is only used for mobile
.popover-menu {
  width: 300px;

  .ant-popover-inner-content {
    padding: 0;

    #nav {
      .ant-menu-item,
      .ant-menu-submenu {
        text-align: left;
      }

      .ant-menu-item-group-title {
        padding-left: 24px;
      }

      .ant-menu-item-group-list {
        padding: 0 16px;
      }

      .ant-menu-item,
      a {
        color: #333;
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  #header {
    text-align: center;

    .menu-row {
      display: none;
    }
  }

  #logo {
    padding-right: 0;
    padding-left: 0;
  }

  .nav-phone-icon {
    display: block;
  }
}
</style>
