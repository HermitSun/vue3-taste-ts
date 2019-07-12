import Vue from 'vue';
import {plugin} from 'vue-function-api';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.warnHandler = (msg, vm, trace) => {
    console.log('WARN: ', msg);
    console.log('Trace: ', trace);
};
Vue.use(plugin);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
