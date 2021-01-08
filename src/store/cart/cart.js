// import axios from 'axios'

export default {
  state: {
    cart: [],
    total: 0
  },
  mutations: {
    cart(state, payload) {
      // state.cart.push(payload)
      state.cart = payload

      if (state.cart.length > 0) {
        state.total = state.cart
          .map(el => {
            return el.price * el.qty
          })
          .reduce((el, i) => {
            return el + i
          })
        console.log(state.total)
      }
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
    },
    total(state) {
      return state.total
    }
  }
}
