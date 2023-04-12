<template>
  <div>
    <h1>User Details</h1>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <br>
    <hr>
    <!-- textbox for editing the user -->
    <div>
      <h1>Edit User</h1>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="editUserName">
      <br><br>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="editUserEmail">
      <br><br>
    </div>
    <button @click="editUser">Edit</button>
    <button @click="deleteUser">Delete</button>
    <br><br>
    <!-- navigate back to the users list -->
    <router-link to="/users">Back to Users</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      editUserName: '',
      editUserEmail: ''
    }
  },
  mounted() {
    const userId = this.$route.params.id;
    const apiURL = `http://localhost:8000/api/users/${userId}/`;

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        this.user = data;
      })
      .catch(error => console.error(error));
  },
  methods: {
    editUser() {
      // send the PUT request to the API and parameters are from Edit User form
      const userId = this.$route.params.id;
      const apiURL = `http://localhost:8000/api/users/${userId}/`;
      fetch(apiURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.editUserName,
          email: this.editUserEmail
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.user.name = this.editUserName
        this.user.email = this.editUserEmail
      }
      )
      .catch(error => console.error(error))
    },
    deleteUser() {
      const userId = this.$route.params.id;
      const apiURL = `http://localhost:8000/api/users/${userId}/`;

      fetch(apiURL, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Navigate back to the user list page
        this.$router.push('/users');
      })
      .catch(error => console.error(error));

    }
  }
}
</script>
