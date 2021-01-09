import axios from 'axios'

export default {
  state: {},
  mutations: {},
  actions: {
    postOrders(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post('orders/post-order', payload)
          .then(res => resolve(res.data.msg))
          .catch(err => reject(err.response.msg))
      })
    }
  },
  getters: {}
}
