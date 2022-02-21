<script>
import Clickoutside from "../utils/clickoutside";
import Emitter from "../mixins/emitter";

export default {
  name: "MeDropdown",
  componentName: "MeDropdown",

  mixins: [Emitter],

  directives: { Clickoutside },

  components: {},

  provide() {
    return {
      dropdown: this,
    };
  },

  props: {
    hideOnClick: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: "bottom-end",
    },
    visibleArrow: {
      default: true,
    },
  },

  data() {
    return {
      visible: false,
      triggerElm: null,
    };
  },

  computed: {},

  mounted() {
    this.$on("menu-item-click", this.handleMenuItemClick);
  },

  watch: {
    visible(val) {
      this.broadcast("MeDropdownMenu", "visible", val);
      this.$emit("visible-change", val);
    },
  },

  methods: {
    show() {
      if (this.triggerElm.disabled) return;
      this.visible = true;
    },
    hide() {
      if (this.triggerElm.disabled) return;
      this.visible = false;
    },
    handleClick() {
      if (this.triggerElm.disabled) return;
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },
    initEvent() {
      let { handleClick } = this;
      this.triggerElm = this.$slots.default[0].elm;
      this.triggerElm.addEventListener("click", handleClick);
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false;
      }
      this.$emit("command", command, instance);
    },
  },

  render(h) {
    let { hide } = this;
    return (
      <div class="me-dropdown" v-clickoutside={hide}>
        {this.$slots.default}
        {this.$slots.dropdown}
      </div>
    );
  },
};
</script>
