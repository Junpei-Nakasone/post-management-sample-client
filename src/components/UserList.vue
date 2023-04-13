<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'user-details', params: {id: user.id}}">{{ user.name }}
        </router-link>
      </li>
    </ul>
    <hr>
    <div>
      <h1>Add New User</h1>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name">
      <br><br>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email">
      <br><br>
      <button @click="createUser">Create User</button>
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL + 'users/',
      users: [],
      name: '',
      email: ''
    }
  },
  mounted() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.users = data;
      })
      .catch(error => console.error(error));
  },
  methods: {
    createUser() {

    fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }
  }
}
</script>

<style>

</style>
