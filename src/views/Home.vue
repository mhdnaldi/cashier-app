<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="form">
        <input
          class="input"
          type="text"
          placeholder="Search..."
          @input="onChange($event.target.value)"
        />
        <select @change="changeCategory($event.target.value)">
          <option value="">Category</option>
          <option value="MAKANAN">Makanan</option>
          <option value="BUKAN MAKANAN">Bukan Makanan</option>
          <option value="ROKOK">Rokok</option>
        </select>
      </div>
    </div>
    <div class="grid">
      <div class="items">
        <table id="customers">
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>ADD TO CART</th>
          </tr>
          <tr v-for="(value, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td style="text-align: left">{{ value.item_name }}</td>
            <td style="text-align: left">{{ value.item_category }}</td>
            <td style="text-align: right">
              <strong>{{ value.item_price }}</strong>
            </td>
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
      cartItems: [],
      search: ''
    }
  },
  mounted() {
    this.getAllItems()
  },
  methods: {
    ...mapActions(['getAllItems', 'cart', 'searchItems', 'sortItems']),
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
    },
    onChange(event) {
      this.search = event
      this.searchItems(this.search)
    },
    changeCategory(event) {
      this.sortItems(event)
    }
  },
  computed: {
    ...mapGetters(['items', 'checkout'])
  }
}
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 40px;
  position: relative;
}

.grid {
  width: 95%;
  height: 530px;
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
  padding: 5px 5px;
  font-size: 12px;
  background-color: #74c7b8;
  border-radius: 5px;
  cursor: pointer;
}

.add:hover,
.add:active {
  background-color: #62b6a7;
}

.items {
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  overflow-x: hidden;
  height: 440px;
}

.items td,
.items th {
  font-size: 16px;
  /* border: 1px solid #ddd; */
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

.input[type='text'] {
  border: 3px solid #ee9595;
  border-radius: 5px;
  width: 200px;
  height: 30px;
  background-color: #ee9595;
  padding: 2px 4px;
  color: #111;
}

::placeholder {
  color: #111;
}
.input[type='text']:focus {
  outline: none;
}

.form {
  margin: 16px 0;
}

select {
  margin-left: 10px;
  width: 110px;
  height: 30px;
  color: #111;
  background-color: #ee9595;
  border: 3px solid #ee9595;
  border-radius: 5px;
}

select:focus {
  outline: none;
}
</style>
