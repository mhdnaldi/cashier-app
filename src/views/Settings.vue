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
        <div>
          <input
            class="search"
            placeholder="Search..."
            type="text"
            name=""
            id=""
            @input="onSearch"
          />
        </div>
        <table id="items">
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>CAPITAL</th>
            <th>PRICE</th>
            <th></th>
          </tr>
          <tr v-for="(value, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td style="text-align: left">{{ value.item_name }}</td>
            <td style="text-align: left">{{ value.item_category }}</td>
            <td style="text-align: right">
              <strong>{{ value.item_capital }}</strong>
            </td>
            <td style="text-align: right">
              <strong>{{ value.item_price }}</strong>
            </td>
            <td>
              <div class="btn-grid">
                <div class="edit-btn" @click="editItems(value)">Edit</div>
                <div class="delete-btn" @click="deleteItem(value.id)">
                  Delete
                </div>
              </div>
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
    ...mapActions([
      'getAllItems',
      'postItems',
      'deleteItems',
      'patchItems',
      'searchItems'
    ]),
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
    },
    onSearch(event) {
      this.searchItems(event.target.value)
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
  background-color: #ee9595;
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
  background-color: #ffcda3;
  color: #111;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit:hover {
  background-color: #f5be91;
}

.form {
  border-radius: 10px;
  background-color: #ee9595;
  padding: 20px;
}

#items {
  width: 90%;
  margin: 20px auto;
}

.items {
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 540px;
  overflow-x: hidden;
  text-align: center;
}

.items td,
.items th {
  padding: 8px 20px;
  font-size: 16px;
}

.items tr {
  background-color: #ffcda3;
}

.items tr:hover {
  background-color: #ef4f4f;
}

.items th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #74c7b8;
  color: white;
}

.btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.edit-btn,
.delete-btn {
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  text-align: center;
  color: #111;
  border-radius: 10px;
  cursor: pointer;
  display: block;
}

.edit-btn {
  background-color: #ee9595;
}

.delete-btn {
  background-color: #74c7b8;
}

label {
  color: #111;
}

.search[type='text'] {
  border: 3px solid#fff;
  border-radius: 5px;
  width: 200px;
  height: 30px;
  background-color: #fff;
  padding: 2px 4px;
  color: #111;
  margin-top: 20px;
  margin-bottom: -20px;
}

::placeholder {
  color: #111;
}
.search[type='text']:focus {
  outline: none;
}
</style>
