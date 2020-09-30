<template>

  <div id="app">

    <b-navbar toggleable="lg" type="light" variant="warning">
      <b-navbar-brand href="#">Hobby Hub</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
          <ul class="navbar-nav ml-auto">

            <li class="nav-item">
              <a class="nav-link" href="">
                <router-link to="/">Home</router-link>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="">
                <router-link to="/activities">Activities</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="!currentUser">
              <a class="nav-link" href="">
                <router-link to="/login">Login</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="!currentUser">
              <a class="nav-link" href="">
                <router-link to="/register">Register</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="currentUser">
              <a class="nav-link" href="">
                <router-link to="/account">Account</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="showAdminPanel">
              <a class="nav-link" href="">
                <router-link to="/admin">Admin</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="currentUser">
              <a class="nav-link" href="" @click="logOut" style="color: #b80f1e">Logout</a>
            </li>
          </ul>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>

</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    showAdminPanel() {
      if (this.currentUser && this.currentUser.user.admin) {
        return this.currentUser.user.admin
      }

      return false
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    color: #2c3e50;
}

</style>
