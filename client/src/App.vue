<template>
<div id="noMansLand">
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="warning" fixed="top">
      <b-navbar-brand href="/"><i class="fab fa-hubspot"></i> Hobby Hub</b-navbar-brand>

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
                <router-link to="/Activities">Activities</router-link>
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
    <!-- Footer -->
    <footer class="footer bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 h-100 text-center my-auto">
            <ul class="list-inline mb-2">
              <li class="list-inline-item">
                <a href="/">Home</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="/activities">Activities</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="/login">Login</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="/register">Register</a>
              </li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">&copy; Hobby Hub 2020. Created with <i class="fas fa-heart"></i> by Eemil, Ramzi &amp; Chrys! </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>
</template>

<script>
import { Api } from '@/Api'

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
  },
  beforeUpdate() {
    if (this.$store.state.auth.user !== null) {
      Api.get('http://localhost:3000/api/users/' + this.$store.state.auth.user.user.id).then(response => {
        if (response.status === 200) {
          return response.data
        }
      }).catch(error => {
        if (error.response.status === 404) {
          this.$store.dispatch('auth/logout')
          return error.response.data
        }
      })
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
.globalMargin {
  margin-top: 50px;
}
#noMansLand {
  width: auto;
  height: 100%;
  background-color: #fffcbe;
}

.img-responsive {
  height: auto;
  width: auto;
  max-height: 50px;
  max-width: 250px;
}

.text-muted {
  padding-bottom: 1%;
}
</style>
