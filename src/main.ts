import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.warnHandler = (msg, vm, trace) => {
    console.log('WARN: ', msg);
    console.log('Trace: ', trace);
};
Vue.use(VueCompositionApi);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
