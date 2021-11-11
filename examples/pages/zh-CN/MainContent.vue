<script>
import navsData from "../../router/nav-antd.config.json";
export default {
  components: {},
  name: "MainContent",
  data() {
    return {
      lang: "zh-CN",
      base: "/component",
      visible: false,
    };
  },
  mounted() {},
  methods: {
    onClose() {
      this.visible = false;
      console.log(this.visible);
    },
    toggleDrawer() {
      this.visible = !this.visible;
    },
    getMenuItems(footerNavIcons = {}) {
      const menuItems = navsData[this.lang];
      return menuItems.map((menuItem) => {
        // menu-item-group
        if (menuItem.type === "group") {
          return (
            <a-menu-item-group title={menuItem.title} key={menuItem.title}>
              {menuItem.children.map((leaf) =>
                this.generateMenuItem(false, leaf, footerNavIcons)
              )}
            </a-menu-item-group>
          );
        }
        return this.generateMenuItem(true, menuItem, footerNavIcons);
      });
    },
    generateMenuItem(isTop, item, { before = null, after = null }) {
      // <router-link
      //   v-if="item.path"
      //   active-class="active"
      //   to={this.base + item.path}
      //   exact
      //   v-text="item.title || item.name"
      // ></router-link>;

      return (
        <a-menu-item>
          <router-link active-class="active" to={this.base + item.path} exact>
            {item.title}
          </router-link>
        </a-menu-item>
      );
    },
  },

  render() {
    return (
      <div class="main-wrapper">
        <a-row>
          {/* isMobile  MobileMenu */}
          <div class="drawer-handle" onClick={this.toggleDrawer}>
            <a-icon type="menu" class="drawer-handle-icon" />
          </div>
          <a-drawer
            placement="left"
            closable={true}
            visible={this.visible}
            onClose={this.onClose}
          >
            <a-menu class="aside-container menu-site" mode="inline">
              {this.getMenuItems()}
            </a-menu>
          </a-drawer>

          <a-col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} class="main-menu">
            <a-affix offset-top={0}>
              <section class="main-menu-inner">
                {/*  openKeys   selectedKeys   onOpenChange */}
                <a-menu class="aside-container menu-site" mode="inline">
                  {this.getMenuItems()}
                </a-menu>
              </section>
            </a-affix>
          </a-col>

          <a-col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
            <router-view class="main-container"></router-view>
            {/*PrevAndNext*/}
            PrevAndNext
          </a-col>
        </a-row>
      </div>
    );
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/component.scss";

// .drawer-left
.drawer-handle {
  right: -40 px;
  box-shadow: 2px 0 8px #00000026;
  border-radius: 0 4 px 4 px 0;
}
</style>
