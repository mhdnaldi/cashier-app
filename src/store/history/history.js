import axios from 'axios'

export default {
  state: {
    day: {},
    week: {},
    month: {},
    recentOrders: []
  },
  mutations: {
    day(state, payload) {
      state.day = payload
    },
    week(state, payload) {
      state.week = payload
    },
    month(state, payload) {
      state.month = payload
    },
    recent(state, payload) {
      state.recentOrders = payload
      console.log(state.recentOrders)
    }
  },
  actions: {
    getToday(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('history/today')
          .then(res => context.commit('day', res.data.data))
          .catch(err => reject(err.response.data.msg))
      })
    },
    getWeek(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('history/this-week')
          .then(res => context.commit('week', res.data.data))
          .catch(err => reject(err.response.data.msg))
      })
    },
    getMonth(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('history/this-week')
          .then(res => context.commit('month', res.data.data))
          .catch(err => reject(err.response.data.msg))
      })
    },
    recentOrders(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('history/recent-orders')
          .then(res => context.commit('recent', res.data.data))
      })
    }
  },
  getters: {
    day(state) {
      return state.day
    },
    week(state) {
      return state.week
    },
    month(state) {
      return state.month
    },
    recent(state) {
      return state.recentOrders
    }
  }
}
