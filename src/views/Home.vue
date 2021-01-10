<template>
  <div>
    <Navbar />
    <div class="container">Search, sort</div>
    <div class="grid">
      <div class="items">
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>ADD TO CART</th>
          </tr>
          <tr v-for="(value, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.item_name }}</td>
            <td>Rp. {{ value.item_price }}</td>
            <td>{{ value.item_category }}</td>
            <td>
              <div class="add" @click="addToCart(value, index)">ADD</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="cart">
        <Cart />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Navbar from '../components/header/Header'
import Cart from '../components/cart/Cart'
export default {
  components: {
    Navbar,
    Cart
  },
  data() {
    return {
      // id: [],
      cartItems: []
    }
  },
  mounted() {
    this.getAllItems()
  },
  methods: {
    ...mapActions(['getAllItems', 'cart']),
    ...mapMutations(['reload']),
    addToCart(payload, index) {
      if (this.checkout) {
        this.cartItems = []
        this.reload(true)
      }
      let cart = {
        name: payload.item_name,
        price: payload.item_price,
        id: payload.id,
        qty: payload.item_qty
      }
      let onCart = this.cartItems.some((el) => {
        return el.id === payload.id
      })
      if (!onCart) {
        this.cartItems.push(cart)
      }
      this.cart(this.cartItems)
    }
  },
  computed: {
    ...mapGetters(['items', 'checkout'])
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 40px;
}

.grid {
  width: 95%;
  height: 570px;
  overflow-x: hidden;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.cart {
  width: 100%;
}

.add {
  text-align: center;
  font-weight: bold;
  width: 70%;
  margin: 0 auto;
  padding: 10px 10px;
  background-color: rgb(50, 185, 16);
  border-radius: 5px;
  cursor: pointer;
}

.add:hover,
.add:active {
  background-color: rgb(44, 156, 16);
}

.none {
  display: none;
}

.items {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.items td,
.items th {
  font-size: 12px;
  /* border: 1px solid #ddd; */
  padding: 8px 20px;
}

.items tr {
  background-color: #111;
}

.items tr:hover {
  background-color: #222;
}

.items th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #040a2c;
  color: white;
}
</style>
