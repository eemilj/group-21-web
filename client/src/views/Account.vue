<template>
  <div class="background">
    <div class="container">
      <div class="globalMargin">
        <header class="header">
          <h1>
            Welcome <strong id="user">{{currentUser.user.username}}</strong>!
          </h1>
        </header>

        <div class="row">
          <div class="col-md-6">
            <h2>User Information</h2>
            <p>
              <strong>Registration date:</strong>
              {{currentUser.user.registrationDate.slice(0,10)}}
            </p>
            <p>
              <strong>Admin role:</strong>
              {{currentUser.user.admin}}
            </p>
            <h2>Created groups:</h2>
            <Groups v-bind:groups="groups" v-on:del-group="deleteGroup"/>
          </div>
          <div class="col-md-6">
            <h2>Update your Password</h2>
            <form name="form" @submit.prevent="handlePasswordUpdate">
              <div v-if="!successful">
                <div class="form-group">
                  <label>Password</label>
                  <input
                    v-model="newPassword"
                    v-validate="'required|min:6|max:40'"
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="Enter your new password"
                    ref="password">
                  <div
                    v-if="submitted && errors.has('password')"
                    class="alert-danger"
                  >{{errors.first('password')}}</div>
                </div>

                <div class="form-group">
                  <label>Confirm password</label>
                  <input
                    v-validate="'required|confirmed:password'"
                    name="password_confirmation"
                    type="password"
                    class="form-control"
                    placeholder="Type the password again"
                    data-vv-as="password">
                </div>

                <div class="alert alert-danger" v-show="errors.any()">
                  <div v-if="errors.has('password')">
                    {{ errors.first('password') }}
                  </div>
                  <div v-if="errors.has('password_confirmation')">
                    {{ errors.first('password_confirmation') }}
                  </div>
                </div>

                <div class="form-group">
                  <button class="btn btn-primary btn-block">Update</button>
                </div>
              </div>
            </form>

            <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Groups from '../Components/Admin/Groups'

export default {
  name: 'Account',
  components: {
    Groups
  },
  data() {
    return {
      newPassword: '',
      submitted: false,
      successful: false,
      message: '',
      groups: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    handlePasswordUpdate() {
      this.message = ''
      this.submitted = true
      this.$validator.validate().then(isValid => {
        if (isValid) {
          Api.patch('/users/' + this.$store.state.auth.user.user.id, {
            password: this.newPassword
          }).then(
            (response) => {
              this.message = 'Your password has been updated successfully!'
              this.successful = true
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
              this.successful = false
            }
          )
        }
      })
    },
    showOwnGroups() {
      Api.get('/groups/owner/' + this.$store.state.auth.user.user.id)
        .then(response => {
          this.groups = response.data
        })
        .catch(error => {
          this.groups = []
          console.log(error)
        })
    },
    deleteGroup(id) {
      Api.delete(`/groups/${id}`)
        .then(response => {
          this.groups = this.groups.filter(group => group.id !== id)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.showOwnGroups()
        })
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    } else {
      this.showOwnGroups()
    }
  }
}
</script>
<style>

.background{
  background: #fffcbe;
  min-height: 900px;
}

h2 {
  font-family: "Arial Nova";
}

.header{
  font-size: 50px;
  margin: 50px;
  text-align: center;
  padding-top: 30px;

}

#user{
  color: #0072ec;
}

</style>
