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
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>ADD TO CART</th>
          </tr>
          <tr v-for="(value, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.item_name }}</td>
            <td>{{ value.item_price }}</td>
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
}

.grid {
  width: 95%;
  height: 570px;
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
  overflow-x: hidden;
  height: 500px;
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

.input[type='text'] {
  border: 1px solid rgb(8, 40, 83);
  border-radius: 5px;
  width: 200px;
  height: 30px;
  background-color: rgb(15, 48, 92);
  padding: 2px 4px;
  color: #fff;
}

::placeholder {
  color: rgb(173, 172, 172);
}
.input[type='text']:focus {
  outline: none;
}

.form {
  margin: 10px 0;
}

select {
  margin-left: 10px;
  width: 110px;
  height: 30px;
  color: rgb(173, 172, 172);
  background-color: rgb(15, 48, 92);
  border: 1px solid rgb(8, 40, 83);
  border-radius: 5px;
}

select:focus {
  outline: none;
}

/* FORM INPUT */
</style>
