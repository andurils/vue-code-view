import type { LocaleSetting, LocaleType } from "types/config";

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: "zh_CN",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  // Whether to show the language picker 是否显示语言选择器
  showPicker: true,
  // Locale 当前语言
  locale: LOCALE.EN_US,
  // Default locale  默认语言
  fallback: LOCALE.ZH_CN,
  // available Locales 可用语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};
