import Vue from 'vue'
import store from './store/store';
//Main pages
import App from './views/app.vue'


const app = new Vue({
    store,
    el: '#app',
    components: { App }
});
