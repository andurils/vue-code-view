import { defineStore } from "pinia";
import { store } from "@examples/store";
import type { LocaleSetting, LocaleType } from "types/config";
import { localeSetting, LOCALE } from "@examples/settings/localeSetting";

// 获取配置信息
const lsLocaleSetting = localeSetting as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}
export const useLocaleStore = defineStore("app-locale", {
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? LOCALE.ZH_CN;
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * 设置多语言信息并缓存
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      // ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     * 初始化多语言信息并从本地缓存加载现有配置
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
  persist: true,
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
