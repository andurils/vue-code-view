// t:i18n处理方法
import { t } from "../locale";

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    },
  },
};
