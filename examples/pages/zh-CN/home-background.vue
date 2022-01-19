<script>
export default {
  name: "HomeBackground",
  render() {
    return (
      <div class="home-banner-background">
        <svg viewBox="0 0 1440 448">
          <g
            transform="translate(383.99167402202, 1.252051729629045)"
            opacity="1"
            frame="229"
          >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <g transform="rotate(0, 170, 170)">
                <svg>
                  <defs>
                    <filter id="banner-circle-shadow-1">
                      <feDropShadow
                        dx="10"
                        dy="10"
                        stdDeviation="10"
                        flood-color="rgba(0,0,0,0.05)"
                      ></feDropShadow>
                    </filter>
                    <linearGradient
                      id="banner-circle-fill-1"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color: rgb(250, 252, 254);"
                      ></stop>
                      <stop
                        offset="100%"
                        style="stop-color: rgb(249, 252, 254);"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <circle
                    cx="170"
                    cy="170"
                    r="140"
                    fill="url(#banner-circle-fill-1)"
                    filter="url(#banner-circle-shadow-1)"
                  ></circle>
                </svg>
              </g>
            </g>
          </g>
          <g
            transform="translate(-228.8319531820249, 245.92621751702052)"
            opacity="1"
            frame="229"
          >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <g transform="rotate(0, 230, 230)">
                <svg>
                  <defs>
                    <filter id="banner-circle-shadow-2">
                      <feDropShadow
                        dx="10"
                        dy="10"
                        stdDeviation="10"
                        flood-color="rgba(0,0,0,0.05)"
                      ></feDropShadow>
                    </filter>
                    <linearGradient
                      id="banner-circle-fill-2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color: rgb(250, 252, 254);"
                      ></stop>
                      <stop
                        offset="50%"
                        style="stop-color: rgb(243, 249, 252);"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <circle
                    cx="230"
                    cy="230"
                    r="200"
                    fill="url(#banner-circle-fill-2)"
                    filter="url(#banner-circle-shadow-2)"
                  ></circle>
                </svg>
              </g>
            </g>
          </g>
          <g
            transform="translate(1236.5303493156114, 171.9203576351686)"
            opacity="1"
            frame="229"
          >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <g transform="rotate(0, 120, 120)">
                <svg>
                  <defs>
                    <filter id="banner-rect-shadow-1">
                      <feDropShadow
                        dx="10"
                        dy="10"
                        stdDeviation="10"
                        flood-color="rgba(0,0,0,0.05)"
                      ></feDropShadow>
                    </filter>
                    <linearGradient
                      id="banner-rect-fill-1"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="25%"
                        style="stop-color: rgb(248, 252, 255);"
                      ></stop>
                      <stop
                        offset="100%"
                        style="stop-color: rgb(248, 251, 255);"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    x="30"
                    y="30"
                    width="180"
                    height="180"
                    fill="url(#banner-rect-fill-1)"
                    filter="url(#banner-rect-shadow-1)"
                  ></rect>
                </svg>
              </g>
            </g>
          </g>
          <g
            transform="translate(641.5665296322315, -670.7941867687358)"
            opacity="1"
            frame="229"
          >
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <g transform="rotate(0, 430, 430)">
                <svg width="860" height="860">
                  <defs>
                    <filter id="banner-diamond-shadow-1">
                      <feDropShadow
                        dx="10"
                        dy="10"
                        stdDeviation="10"
                        flood-color="rgba(0,0,0,0.05)"
                      ></feDropShadow>
                    </filter>
                    <linearGradient
                      id="banner-diamond-fill-1"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="60%"
                        style="stop-color: rgb(252, 253, 255);"
                      ></stop>
                      <stop
                        offset="100%"
                        style="stop-color: rgb(252, 253, 254);"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 30 430 430 30 830 430 430 830 Z"
                    fill="url(#banner-diamond-fill-1)"
                    filter="url(#banner-diamond-shadow-1)"
                  ></path>
                </svg>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/default.scss";

.home-banner-background {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  > * {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  > img {
    display: block;
  }

  > svg {
    display: none;
  }
}

@media (min-width: $screen-sm-min) {
  .home-banner-background {
    > img {
      display: none;
    }

    > svg {
      display: block;
    }
  }
}
</style>
