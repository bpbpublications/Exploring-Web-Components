import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import MyComponent from './components/MyComponent.vue';
import App from './App.vue';

const CustomElement = wrap(Vue, MyComponent);
window.customElements.define('my-component', CustomElement);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
