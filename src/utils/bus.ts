import Vue from 'vue';
import {plugin, state} from 'vue-function-api';

Vue.use(plugin);

export const bus = state({
    total: 0,
});
