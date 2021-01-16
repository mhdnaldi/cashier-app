<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="today">
        <h3>Today</h3>
        <div class="income">
          <p>
            TOTAL INCOME : <strong>Rp. {{ day.total }} </strong>
          </p>
          <p>
            TOTAL PROFIT : <strong>Rp. {{ day.profit }} </strong>
          </p>
        </div>
      </div>
      <div class="week">
        <h3>This Week</h3>
        <div class="income">
          <p>
            TOTAL INCOME : <strong>Rp. {{ week.total }} </strong>
          </p>
          <p>
            TOTAL PROFIT : <strong>Rp. {{ week.profit }} </strong>
          </p>
        </div>
      </div>
      <div class="month">
        <h3>This Month</h3>
        <div class="income">
          <p>
            TOTAL INCOME : <strong>Rp. {{ month.total }} </strong>
          </p>
          <p>
            TOTAL PROFIT : <strong>Rp. {{ month.profit }} </strong>
          </p>
        </div>
      </div>
    </div>
    <h2 style="text-align: center; margin-bottom: 20px; color: #111">
      RECENT ORDERS
    </h2>
    <div class="items">
      <table id="customers">
        <tr>
          <th>ORDERS</th>
          <th>INVOICE</th>
          <th>NAME</th>
          <th>CATEGORY</th>
          <th>QUANTITY</th>
          <th>TOTAL PRICE</th>
          <th>PROFIT</th>
        </tr>
        <tr v-for="(value, index) in recent" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ value.history_id }}</td>
          <td style="text-align: left">{{ value.item_name }}</td>
          <td style="text-align: left">{{ value.item_category }}</td>
          <td>{{ value.item_qty }}</td>
          <td style="text-align: right">
            <strong>{{ value.total_price }}</strong>
          </td>
          <td style="text-align: right">
            <strong>{{ value.total_price - value.total_capital }}</strong>
          </td>
        </tr>
      </table>
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
    this.recentOrders()
  },
  methods: {
    ...mapActions(['getToday', 'getWeek', 'getMonth', 'recentOrders'])
  },
  computed: {
    ...mapGetters(['day', 'week', 'month', 'recent'])
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
  height: 140px;
  border-radius: 20px;
  background-color: #74c7b8;
  border: 4px solid #111;
}

.container h3 {
  text-align: center;
  margin-top: 10px;

  color: #111;
}

.income {
  padding: 0 20px;
  margin: 20px auto;
  text-align: left;
}

.income p {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin: 10px auto;
}

.items {
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  overflow-x: hidden;
  padding: 0;
  height: 335px;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
}

.items td,
.items th {
  font-size: 16px;
  text-align: center;
  padding: 8px 20px;
}

.items tr {
  background-color: #ffcda3;
}

.items tr:hover {
  background-color: #ee9595;
}

.items th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #74c7b8;
  color: white;
}
</style>
