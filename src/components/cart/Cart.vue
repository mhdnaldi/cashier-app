<template>
  <div class="cart">
    <div class="container" v-for="(value, index) in cart" :key="index">
      <div class="main">
        <p>Name: {{ value.name }}</p>
        <p>Price: Rp. {{ value.price * value.qty }}</p>
      </div>
      <div class="button">
        <div class="btn" @click="descending(value, index)">-</div>
        <div>{{ value.qty }}</div>
        <div class="btn" @click="ascending(value, index)">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      totalPrice: 0
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  methods: {
    ascending(payload) {
      payload.qty++
      this.totalPrice = payload.price * payload.qty
      console.log(this.totalPrice)
    },
    descending(payload, index) {
      if (payload.qty > 0) {
        payload.qty--
      } else {
        payload.qty = 0
      }
    }
  }
}
</script>

<style scoped>
.cart {
  height: 500px;
  overflow-x: hidden;
  border-left: 5px solid #111;
}

.container {
  width: 90%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.container p {
  margin: 10px 0;
}

.button {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.button div {
  font-weight: bold;
  background-color: black;
  padding: 8px;
  margin: 3px;
  text-align: center;
  border-radius: 10px;
}

.btn {
  cursor: pointer;
}
</style>
