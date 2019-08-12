import Vue from 'vue';
import Index from './pages/index/index.vue';

console.log('runing');
export default new Vue({
  Index,
  render: h => h(Index),
}).$mount('#root');

