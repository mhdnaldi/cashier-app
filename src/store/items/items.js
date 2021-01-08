import axios from 'axios'

export default {
  state: {
    items: []
  },
  mutations: {
    getAllItems(state, payload) {
      state.items = payload
      console.log(payload)
    }
  },
  actions: {
    getAllItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('items/get-items/')
          .then(res => {
            context.commit('getAllItems', res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  },
  getters: {
    items(state) {
      return state.items
    }
  }
}
