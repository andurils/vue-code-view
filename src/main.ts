import Vue from 'vue';

import Repl from './Repl.vue';
new Vue({
    render: (h) => h(Repl),
}).$mount('#app');