import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia(); // 创建一个 pinia（根存储）
store.use(createPersistedState()); //开启缓存，存储在localstorage

export { store };
