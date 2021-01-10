// import axios from 'axios'

export default {
  state: {
    cart: [],
    total: 0,
    success: false
  },
  mutations: {
    cart(state, payload) {
      state.cart = payload
      if (state.cart.length > 0) {
        state.total = state.cart
          .map(el => {
            return el.price * el.qty
          })
          .reduce((el, i) => {
            return el + i
          })
      }
    },
    success(state, payload) {
      state.cart = []
    },
    reload(state, payload) {
      if (payload) {
        state.success = false
      } else {
        state.success = true
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
    },
    checkout(state) {
      return state.success
    }
  }
}
