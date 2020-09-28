<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Username</label>
      <input required v-model="username" type="text" placeholder="Username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      const username = this.username
      const password = this.password
      this.$store.dispatch('login', { username, password })
        .then(() => window.location.replace('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
