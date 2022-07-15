export type LocaleType = "zh_CN" | "en";

/**
 * 本地化设置
 *
 */
export interface LocaleSetting {
  // Whether to show the language picker 是否显示语言选择器
  showPicker: boolean;
  // Current language 当前语言
  locale: LocaleType;
  // default language 默认语言
  fallback: LocaleType;
  // available Locales 可用语言
  availableLocales: LocaleType[];
}
