<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="username">Username</label>
      <div>
        <input id="username" type="text" v-model="username" required autofocus>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="passwordConfirmation" required>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      admin: null
    }
  },
  methods: {
    register: function () {
      const data = {
        username: this.username,
        password: this.password,
        admin: this.admin
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
