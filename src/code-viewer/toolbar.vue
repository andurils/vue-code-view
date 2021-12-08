<script>
import Tooltip from "../components/tooltip";
import MeButton from "../components/button.vue";
import Locale from "../mixins/locale";

export default {
  name: "Toolbar",
  mixins: [Locale],
  inject: ["handleShowCode", "handleChangeTransparent", "changView"],
  components: {
    MeButton,
    Tooltip,
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    defaultButtonRender(showCodeButton, showTransparentButton) {
      return (
        <div>
          {showCodeButton} {showTransparentButton}
          <Tooltip
            class="item"
            effect="dark"
            content={"top布局"}
            placement="top"
          >
            <me-button
              icon="layout-top-fill"
              size="xs"
              circle
              onClick={() => this.changView("top")}
            ></me-button>
          </Tooltip>
          <Tooltip
            class="item"
            effect="dark"
            content={"right布局"}
            placement="top"
          >
            <me-button
              icon="layout-right-fill"
              size="xs"
              circle
              onClick={() => this.changView("right")}
            ></me-button>
          </Tooltip>
          <Tooltip
            class="item"
            effect="dark"
            content={"left布局"}
            placement="top"
          >
            <me-button
              icon="layout-left-fill"
              size="xs"
              circle
              onClick={() => this.changView("left")}
            ></me-button>
          </Tooltip>
        </div>
      );
    },
  },
  computed: {},

  render() {
    const showCodeButton = (
      <Tooltip
        class="item"
        effect="dark"
        content={this.t("el.codebutton.text")}
        placement="top"
      >
        <me-button
          icon="code"
          size="xs"
          circle
          onClick={this.handleShowCode}
        ></me-button>
      </Tooltip>
    );
    const showTransparentButton = (
      <Tooltip
        class="item"
        effect="dark"
        content={this.t("el.transparentbutton.text")}
        placement="top"
      >
        <me-button
          icon="transparent"
          size="xs"
          circle
          onClick={this.handleChangeTransparent}
        ></me-button>
      </Tooltip>
    );
    return (
      <div class="code-view-toolbar eqwZsr1">
        {this.defaultButtonRender(showCodeButton, showTransparentButton)}
        {/* {renderToolbar
            ? renderToolbar(showCodeButton, showTransparentButton)
            : this.defaultButtonRender(showCodeButton, showTransparentButton)}*/}
      </div>
    );
  },
};
</script>
