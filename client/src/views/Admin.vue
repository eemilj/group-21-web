<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Welcome <strong>{{currentUser.user.username}}</strong>!
      </h3>
    </header>

    <p>
      <strong>Id:</strong>
      {{currentUser.user.id}}
    </p>

    <p>
      <strong>Registration date:</strong>
      {{currentUser.user.registrationDate}}
    </p>

    <p>
      <strong>Admin role:</strong>
      {{currentUser.user.admin}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    }
  }
}
</script>
