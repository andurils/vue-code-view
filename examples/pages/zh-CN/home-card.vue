<script>
import PicGuide from "@assets/images/guide.png";
import PicComponent from "@assets/images/component.png";
import PicThemeIndex from "@assets/images/theme-index-icon.svg";
import PicResource from "@assets/images/resource.png";

export default {
  name: "HomeCard",
  data() {
    return {
      cardList: [
        {
          title: "轻量",
          desc: "无需安装任何环境，打开页面快速体验交互细节。",
          bgSrc: PicGuide,
        },
        {
          title: "实时",
          desc: "在线代码编辑器实时调试预览代码编辑效果。",
          bgSrc: PicThemeIndex,
        },
        {
          title: "交互",
          desc: "支持代码高亮、括号/标签匹配自动关闭、代码折叠。",
          bgSrc: PicComponent,
        },
        {
          title: "Markdown",
          desc: "支持 Markdown 示例实时渲染。",
          bgSrc: PicResource,
        },
      ],
    };
  },
  render() {
    return (
      <a-row gutter={[24, 32]}>
        {this.cardList.map((item) => {
          return (
            <a-col xs={24} sm={6}>
              <a-card hoverable class="more-card">
                <img slot="cover" alt="example" src={item.bgSrc} />
                <a-card-meta
                  title={item.title}
                  description={item.desc}
                ></a-card-meta>
              </a-card>
            </a-col>
          );
        })}
      </a-row>
    );
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/default.scss";

.more-card {
  &:hover {
    box-shadow: $shadow-2;
  }

  .ant-card-cover {
    padding: 24px 24px 0 !important;
  }

  .ant-card-body {
    color: #314659;
  }

  .ant-card-meta-detail {
    display: flex;
    flex-direction: column;
    min-height: 170px;

    .ant-card-meta-title {
      min-height: 50px;
      margin-bottom: 16px;
      color: #0d1a26;
      font-weight: 400;
      white-space: normal;
      text-overflow: initial;
      word-break: break-word;
    }

    .ant-card-meta-description {
      flex: auto;
      color: #697b8c;
    }
  }
}

@media (max-width: $screen-sm-min) {
  .more-card {
    .ant-card-cover {
      margin-bottom: 12px;
      padding: 16px 16px 0;

      img {
        height: 184px;
      }
    }

    .ant-card-meta-title {
      font-size: 18px;
    }

    .ant-card-body {
      padding: 16px;

      .ant-card-meta-detail {
        min-height: 150px;
      }
    }
  }
}
</style>
