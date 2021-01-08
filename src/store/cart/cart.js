// import axios from 'axios'

export default {
  state: {
    cart: []
  },
  mutations: {
    cart(state, payload) {
      state.cart.push(payload)
      console.log(state.cart)
    }
  },
  actions: {
    cart(context, payload) {
      context.commit('cart', payload)
    }
  },
  getters: {
    cart(state) {
      return state.cart
    }
  }
}
