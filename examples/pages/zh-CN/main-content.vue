<script>
import navsData from "../../router/side-nav.config.json";
export default {
  components: {},
  name: "MainContent",
  data() {
    return {
      lang: "zh-CN",
      base: "/doc",
      visible: false,
      selectedMenuKey: "",
    };
  },
  mounted() {},
  methods: {
    onClose() {
      this.visible = false;
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
      const child = !item.href ? (
        <router-link active-class="active" to={this.base + item.path} exact>
          {before}
          {item.title}
          {after}
        </router-link>
      ) : (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          class="menu-item-link-outside"
        >
          {before}
          {item.title}
          {after}
        </a>
      );

      return <a-menu-item key={item.name.toLowerCase()}>{child}</a-menu-item>;
    },
    changeSelectedMenu(key) {
      this.selectedMenuKey = key;
    },
  },
  computed: {
    isOverview() {
      return /^overview/.test(this.$route.name || "");
    },
  },

  render() {
    const menuChild = (
      <a-menu
        class="aside-container menu-site"
        mode="inline"
        onClick={({ key }) => this.changeSelectedMenu(key)}
        selectedKeys={[this.isOverview ? "overview" : this.selectedMenuKey]}
      >
        {this.getMenuItems()}
      </a-menu>
    );

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
            {menuChild}
          </a-drawer>

          <a-col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} class="main-menu">
            <a-affix offset-top={0}>
              <section class="main-menu-inner">{menuChild}</section>
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
@import "../../assets/styles/default.scss";
@import "../../assets/styles/component.scss";

// .drawer-left
.drawer-handle {
  display: none;
  right: -40 px;
  box-shadow: 2px 0 8px #00000026;
  border-radius: 0 4 px 4 px 0;
}

.ant-drawer-body {
  padding: 56px 0;
}

@media only screen and (max-width: $mobile-max-width) {
  .drawer-handle {
    display: block;
  }

  .main-menu {
    display: none;
  }
}
</style>
