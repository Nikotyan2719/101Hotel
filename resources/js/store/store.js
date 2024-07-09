import Vue from 'vue';
import Vuex from 'vuex';

import CommentPageState from "../views/components/CommentPage/CommentPageState";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        CommentPageState,
    }
})
