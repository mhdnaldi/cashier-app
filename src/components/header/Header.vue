<template>
  <div class="main">
    <header>
      <ul>
        <li class="list-item">
          <router-link active-class="active" tag="li" to="/">Home</router-link>
        </li>
        <li class="list-item">
          <router-link tag="li" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="list-item">
          <router-link tag="li" to="/settings">Settings</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.main {
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
}

ul {
  list-style: none;
}

ul li {
  text-decoration: none;
  cursor: pointer;
  color: white;
  display: inline-block;
  font-weight: bold;
}

.list-item {
  margin: 5px 10px;
  padding: 10px 20px;
}

li:hover,
li:active {
  color: grey;
}
</style>
