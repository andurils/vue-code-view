let frameRef = 0;

const DEFAULT_VALUES = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  opacity: 1,
  originX: 0.5,
  originY: 0.5,
  theme: {},
};
const INFO_KEYS = Object.keys(DEFAULT_VALUES);

function fillInfo(info, { frames = [] }) {
  const ret = { ...info };
  INFO_KEYS.forEach((key) => {
    if (info[key] === undefined) {
      for (let i = frames.length - 1; i >= 0; i -= 1) {
        const frame = frames[i];
        const frameValue = frame[key];
        if (frameValue !== undefined) {
          ret[key] = frameValue;
          return;
        }
      }

      ret[key] = DEFAULT_VALUES[key];
    }
  });
  return ret;
}

function getFrameInfo(frames) {
  for (let i = 0; i < frames.length - 1; i += 1) {
    const startFrame = frames[i];
    const endFrame = frames[i + 1];

    // Getting motion
    if (startFrame.frame <= frameRef && frameRef < endFrame.frame) {
      const startInfo = fillInfo(startFrame, {
        frames: frames.slice(0, i),
      });
      const endInfo = fillInfo(endFrame, { frames: frames.slice(0, i + 1) });
      const ptg =
        (frameRef.current - startFrame.frame) /
        (endFrame.frame - startFrame.frame);

      const { cubic } = startFrame;

      return {
        x: getTransitionValue(startInfo.x, endInfo.x, ptg, cubic),
        y: getTransitionValue(startInfo.y, endInfo.y, ptg, cubic),
        rotate: getTransitionValue(
          startInfo.rotate,
          endInfo.rotate,
          ptg,
          cubic
        ),
        scaleX: getTransitionValue(
          startInfo.scaleX,
          endInfo.scaleX,
          ptg,
          cubic
        ),
        scaleY: getTransitionValue(
          startInfo.scaleY,
          endInfo.scaleY,
          ptg,
          cubic
        ),
        originX: getTransitionValue(
          startInfo.originX,
          endInfo.originX,
          ptg,
          cubic
        ),
        originY: getTransitionValue(
          startInfo.originY,
          endInfo.originY,
          ptg,
          cubic
        ),
        opacity: getTransitionValue(
          startInfo.opacity,
          endInfo.opacity,
          ptg,
          cubic
        ),
        theme: endInfo.theme || startInfo.theme,
      };
    }
  }

  return fillInfo(frames[frames.length - 1], {
    frames: frames.slice(0, -1),
  });
}
