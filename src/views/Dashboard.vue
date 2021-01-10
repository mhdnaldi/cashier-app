<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="today">
        <h3>Today</h3>
        <div class="income">
          <p>
            INCOME: <strong>Rp. {{ day.total }} </strong>
          </p>
          <p>
            PROFIT: <strong>Rp. {{ day.profit }} </strong>
          </p>
        </div>
      </div>
      <div class="week">
        <h3>This Week</h3>
        <div class="income">
          <p>
            INCOME: <strong>Rp. {{ week.total }} </strong>
          </p>
          <p>
            PROFIT: <strong>Rp. {{ week.profit }} </strong>
          </p>
        </div>
      </div>
      <div class="month">
        <h3>This Month</h3>
        <div class="income">
          <p>
            INCOME: <strong>Rp. {{ month.total }} </strong>
          </p>
          <p>
            PROFIT: <strong>Rp. {{ month.profit }} </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/header/Header'
export default {
  components: {
    Navbar
  },
  data() {
    return {}
  },
  mounted() {
    this.getToday()
    this.getWeek()
    this.getMonth()
  },
  methods: {
    ...mapActions(['getToday', 'getWeek', 'getMonth'])
  },
  computed: {
    ...mapGetters(['day', 'week', 'month'])
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
}

.today,
.week,
.month {
  width: 25%;
  height: 150px;
  border-radius: 20px;
  background-color: rgb(13, 8, 78);
}

.container h3 {
  text-align: center;
  margin-top: 10px;
}

.income {
  padding: 0 20px;
  margin: 20px auto;
}

.income p {
  font-size: 14px;
  color: darkgrey;
  margin: 10px auto;
}
</style>
