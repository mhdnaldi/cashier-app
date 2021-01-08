<template>
  <div>
    <Navbar />
    <div class="container"></div>
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
              <div
                class="add"
                v-if="!id.includes(value.id)"
                @click="addToCart(value, index)"
              >
                ADD
              </div>
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
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/header/Header'
import Cart from '../components/cart/Cart'
export default {
  components: {
    Navbar,
    Cart
  },
  data() {
    return {
      id: [],
      cartItems: []
    }
  },
  mounted() {
    this.getAllItems()
  },
  methods: {
    ...mapActions(['getAllItems', 'cart']),
    addToCart(payload, index) {
      let cart = {
        name: payload.item_name,
        price: payload.item_price,
        id: payload.id,
        qty: payload.item_qty
      }
      this.id.push(cart.id)
      this.cartItems.push(cart)
      // this.cart(cart)
      this.cart(this.cartItems)
    }
  },
  computed: {
    ...mapGetters(['items'])
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
  margin: auto;
  display: grid;
  grid-template-columns: 60% 40%;
}

.cart {
  width: 100%;
}

.add {
  text-align: center;
  width: 70%;
  margin: 0 auto;
  padding: 10px 10px;
  background-color: red;
  border-radius: 5px;
  cursor: pointer;
}

.none {
  display: none;
}

.add:hover {
  background-color: rgb(221, 9, 9);
}

.items {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.items td,
.items th {
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
