import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        total: 0,
    },
    mutations: {
        increaseTotal(state) {
            state.total++;
        },
        decreaseTotal(state) {
            state.total--;
        },
    },
    actions: {
        increaseTotal({commit}) {
            commit('increaseTotal');
        },
        decreaseTotal({commit}) {
            commit('decreaseTotal');
        },
    },
});

// a tricky patch
export const useStore = () => {
    return store;
};

export default store;
