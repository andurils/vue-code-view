import Vue from 'vue';
import './style.css'
// import App from './App.vue';
// new Vue({
//     render: (h) => h(App),
// }).$mount('#app');

import Repl from './Repl.vue';
new Vue({
    render: (h) => h(Repl),
}).$mount('#app');