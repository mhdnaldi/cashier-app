<template>
  <div>
    <div class="cart" v-if="cart.length <= 0"><h2>CART IS EMPTY</h2></div>
    <div class="cart" v-if="cart.length > 0">
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
        <div class="lines"></div>
      </div>
    </div>
    <div class="total" v-if="totalPrice > 0">
      <p>
        Total:
        {{
          totalPrice.toLocaleString('id', {
            style: 'currency',
            currency: 'IDR'
          })
        }}
      </p>
      <div class="checkout" @click="checkout">Checkout</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      totalPrice: 0
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  updated() {
    this.totalPrice = this.cart
      .map((el) => el.price * el.qty)
      .reduce((el, i) => el + i)
  },
  methods: {
    ...mapActions(['postOrders']),
    ...mapMutations(['success', 'reload']),
    ascending(payload) {
      if (this.cart) {
        payload.qty++
        this.totalPrice = this.cart
          .map((el) => {
            return el.price * el.qty
          })
          .reduce((el, i) => {
            return el + i
          })
      }
    },
    descending(payload, index) {
      if (this.cart) {
        if (payload.qty >= 1) {
          payload.qty--
          this.totalPrice = this.cart
            .map((el) => {
              return el.price * el.qty
            })
            .reduce((el, i) => {
              return el + i
            })
        } else {
          this.cart.splice(index, 1)
        }
      }
    },
    checkout() {
      const setData = this.cart.map((el) => {
        return {
          id: el.id,
          qty: el.qty
        }
      })
      this.postOrders(setData)
        .then((res) => {
          alert(res)
          this.success()
          this.reload()
          this.totalPrice = 0
        })
        .catch((err) => alert(err))
    }
  }
}
</script>

<style scoped>
.cart {
  position: relative;
  height: 500px;
  overflow-x: hidden;
  border: 5px solid #111;
}

.cart h2 {
  text-align: center;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 0;
  right: 0;
}

.total {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.checkout {
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
  background-color: rgb(196, 44, 44);
  padding: 5px 10px;
  box-sizing: border-box;
}

.checkout:hover {
  background-color: rgb(233, 36, 36);
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

.lines {
  width: 100%;
  border-bottom: 1px solid black;
}
</style>
