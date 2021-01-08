import Vue from 'vue'
import Vuex from 'vuex'
import Items from './items/items'
import Cart from './cart/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Items,
    Cart
  }
})
