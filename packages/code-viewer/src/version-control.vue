<script>
export default {
  name: "VersionControl",
  inject: ["vueCodeView", "resetFunc"],
  props: {
    delay: { type: Number },
    tooltipPlacement: { type: String, default: "top-end" },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  render() {
    return (
      <div class="version-control-wrapper">
        <el-popover placement="top" width="400" trigger="click">
          {this.vueCodeView.versionHistoryList && (
            <div>
              {this.vueCodeView.versionHistoryList.map((item, index) => {
                return (
                  index < 10 && (
                    <div
                      on-click={this.resetFunc}
                      data-timestamp={item.timeStamp}
                    >
                      {item.saveTime}
                    </div>
                  )
                );
              })}
            </div>
          )}
          <div slot="reference" class="time-ago">
            <el-tooltip
              effect="dark"
              content="历史版本"
              placement={this.tooltipPlacement}
            >
              <span class="icon iconfont icon-time-circle"></span>
            </el-tooltip>
            <span class="save-time">{this.vueCodeView.lastSaveTime}</span>
          </div>
        </el-popover>

        {/* --------- 时间提醒 --------- */}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.version-control-wrapper {
  display: flex;
  align-items: center;
  padding-left: 12px;

  .time-ago {
    display: flex;
    align-items: center;
  }

  .save-time {
    color: #606266;
    margin-left: 8px;
    font-size: 16px;
    line-height: 1.5;
  }

  .icon {
    font-size: 20px;
    line-height: 1.4;
    cursor: pointer;
  }
}
</style>
