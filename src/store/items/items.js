import axios from 'axios'

export default {
  state: {
    items: []
  },
  mutations: {
    getAllItems(state, payload) {
      state.items = payload
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
            reject(err)
          })
      })
    },
    postItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('items/', payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            resolve(err.response.data.msg)
          })
      })
    },
    deleteItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`items/delete-items/${payload}`)
          .then(res => {
            resolve(res.data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    patchItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`items/${payload.id}`, payload.data)
          .then(res => {
            resolve(res.data.msg)
          })
          .catch(err => {
            reject(err.response.msg)
          })
      })
    },
    searchItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`items/search-items?name=${payload}`)
          .then(res => {
            context.commit('getAllItems', res.data.data)
          })
          .catch(err => err.response.msg)
      })
    },
    sortItems(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`items/sort-items?category=${payload}`)
          .then(res => context.commit('getAllItems', res.data.data))
          .catch(err => err.response.msg)
      })
    }
  },
  getters: {
    items(state) {
      return state.items
    }
  }
}
