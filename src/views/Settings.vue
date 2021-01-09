<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="form">
        <form>
          <label>Name</label>
          <input type="text" v-model="form.item_name" />

          <label>Capital</label>
          <input type="number" v-model="form.item_capital" />
          <label>Price</label>
          <input type="number" v-model="form.item_price" />

          <label>Category</label>
          <select v-model="form.item_category">
            <option value="MAKANAN">Makanan</option>
            <option value="BUKAN MAKANAN">Bukan Makanan</option>
            <option value="ROKOK">Rokok</option>
          </select>

          <button
            v-show="showSubmit"
            @click.prevent="submitData"
            class="submit"
          >
            Submit
          </button>
          <button
            v-show="showUpdate"
            @click.prevent="updateData"
            class="submit"
          >
            Update
          </button>
        </form>
      </div>
      <div class="items">
        <table id="items">
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>CAPITAL</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th></th>
          </tr>
          <tr v-for="(value, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.item_name }}</td>
            <td>Rp. {{ value.item_capital }}</td>
            <td>Rp. {{ value.item_price }}</td>
            <td>{{ value.item_category }}</td>
            <td>
              <div class="edit-btn" @click="editItems(value)">Edit</div>
              <div class="delete-btn" @click="deleteItem(value.id)">Delete</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/header/Header'
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted() {
    this.getAllItems()
  },
  components: {
    Navbar
  },
  data() {
    return {
      form: {
        item_name: '',
        item_capital: '',
        item_price: '',
        item_category: '',
        item_qty: 1
      },
      id: '',
      showSubmit: true,
      showUpdate: false
    }
  },
  methods: {
    ...mapActions(['getAllItems', 'postItems', 'deleteItems', 'patchItems']),
    submitData() {
      this.postItems(this.form)
        .then((res) => {
          this.getAllItems()
          this.form = {
            item_name: '',
            item_capital: '',
            item_price: '',
            item_category: '',
            item_qty: 1
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    deleteItem(id) {
      this.deleteItems(id)
        .then((res) => {
          alert(res)
          this.getAllItems()
        })
        .catch((err) => {
          alert(err)
        })
    },
    editItems(payload) {
      this.id = payload.id
      this.form = {
        item_name: payload.item_name,
        item_price: payload.item_price,
        item_capital: payload.item_capital,
        item_category: payload.item_category,
        item_qty: 1
      }
      this.showSubmit = false
      this.showUpdate = true
    },
    updateData() {
      const setData = {
        id: this.id,
        data: this.form
      }
      this.patchItems(setData)
        .then((res) => {
          alert(res)
          this.getAllItems()
          this.showSubmit = true
          this.showUpdate = false
          this.form = {
            item_name: '',
            item_capital: '',
            item_price: '',
            item_category: '',
            item_qty: 1
          }
        })
        .catch((err) => {
          alert(err)
        })
    }
  },
  computed: {
    ...mapGetters({ items: 'items' })
  }
}
</script>

<style scoped>
.container {
  display: grid;
  width: 90%;
  gap: 20px;
  margin: 20px auto;
  grid-template-columns: 30% 70%;
}

.items {
  width: 100%;
  border-radius: 10px;
  background-color: #15022e;
}

input[type='text'],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type='number'],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit:hover {
  background-color: #45a049;
}

.form {
  border-radius: 5px;
  background-color: #15022e;
  padding: 20px;
}

#items {
  width: 90%;
  margin: 20px auto;
}

.items {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 600px;
  overflow-x: hidden;
}

.items td,
.items th {
  border: 1px solid #ddd;
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

.edit-btn,
.delete-btn {
  width: 100%;
  height: 50%;
  margin: 10px auto;
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  /* display: inline-block; */
}

.edit-btn {
  background-color: rgb(21, 190, 21);
}

.delete-btn {
  background-color: rgb(201, 35, 35);
}
</style>
