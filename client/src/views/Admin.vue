<template>
  <div>
    <div >
      <div class="row">
        <div class="col-12 col-md-12" col-xs-3>
          <div class="fixed" >
            <h1 class="marginAll"> Admin Page</h1>
            <UpdateActivity  v-on:update-activityName="createNewActivityName"/>
          </div>
        </div>
      </div>
      <h2 class="marginActivities" id="titleBackground" > Activities</h2>
      <AddActivity v-on:add-activity="addActivity"/>
      <button @click="deleteActivities">Delete All Activities</button>

      <ActivitiesAdmin v-bind:activities="activities" v-on:del-activity="deleteOneActivitiy"
                       v-on:update-activityName="updateActivityName"
                       v-on:update-activityType="updateActivityType"
      />

      <h2 class="margin" id="titleBackground"> Groups</h2>

      <Groups v-bind:groups="groups" v-on:del-group="deleteOneGroup" />

      <h2 class="margin" id="titleBackground">Users</h2>

      <Users v-bind:users="users" v-on:del-user="deleteOneUser"
             v-on:update-user="updateUser"
             v-on:update-admin="updateAdmin"/>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ActivitiesAdmin from '../../Components/ActivitiesAdmin'
import AddActivity from '../../Components/AddActivity'
import UpdateActivity from '../../Components/UpdateActivity'
import Groups from '../../Components/Groups'
import Users from '../../Components/Users'

export default {
  name: 'admin',
  components: {
    UpdateActivity,
    AddActivity,
    ActivitiesAdmin,
    Groups,
    Users
  },
  data() {
    return {
      activities: [],
      groups: [],
      users: [],
      name: '',
      activity_type: '',
      id: '',
      admin: Boolean
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    this.showActivities()
    this.showGroups()
    this.showUsers()

    if (!this.currentUser) {
      this.$router.push('/login')
    } else if (!this.currentUser.user.admin) {
      this.$router.push('/account')
    }
  },
  methods: {
    addActivity(newActivity) {
      // eslint-disable-next-line camelcase
      const { name, activity_type } = newActivity
      Api.post('/activities', {
        name,
        activity_type
      })
        .catch(err => console.log(err))
        .then(() => {
          this.showActivities()
        })
    },
    createNewActivityName(newActivity) {
      // eslint-disable-next-line camelcase
      const { name } = newActivity
      this.ObjectType = name
    },
    createNewUser(newUser) {
      // eslint-disable-next-line camelcase
      const { name2 } = newUser
      this.ObjectType = name2
    },
    showActivities() {
      Api.get('/activities')
        .then(response => {
          this.activities = response.data
        })
        .catch(error => {
          this.activities = []
          console.log(error)
        })
    },
    showGroups() {
      Api.get('/groups')
        .then(response => {
          this.groups = response.data
        })
        .catch(error => {
          this.groups = []
          console.log(error)
        })
    },
    showUsers() {
      Api.get('/users')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
    },
    updateActivityName(id) {
      var name = this.ObjectType
      Api.patch(`/activities/${id}`, {
        name: name
      })
        .catch(err => console.log(err))
        .then(() => {
          this.showActivities()
        })
    },
    updateActivityType(id) {
      var type = this.ObjectType
      Api.patch(`/activities/${id}`, {
        activity_type: type
      })
        .catch(err => console.log(err))
        .then(() => {
          this.showActivities()
        })
    },
    updateUser(id) {
      var type = this.ObjectType
      Api.patch(`/users/${id}`, {
        username: type
      })
        .catch(err => console.log(err))
        .then(() => {
          this.showUsers()
        })
    },
    updateAdmin(id) {
      var type = this.ObjectType
      Api.patch(`/users/${id}`, {
        admin: type
      })
        .catch(err => console.log(err))
        .then(() => {
          this.showUsers()
        })
    },
    deleteActivity() {
      Api.delete('/activities/5f6f07f83466b51c6411481e')
        .then(res => {
          var idx = -1
          for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].activity.id === '5f6f07f83466b51c6411481e') {
              idx = i
            }
          }
          this.activities.splice(idx, 1)
        })
        .catch(err => console.log(err))
    },
    deleteActivities() {
      Api.delete('/activities')
        .then(response => {
          this.activities = []
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.showActivities()
        })
    },
    deleteOneActivitiy(id) {
      Api.delete(`/activities/${id}`)
        .then(response => {
          this.activities = this.activities.filter(activity => activity.id !== id)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.showActivities()
        })
    },
    deleteOneGroup(id) {
      Api.delete(`/groups/${id}`)
        .then(response => {
          this.groups = this.groups.filter(group => group.id !== id)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.showActivities()
        })
    },
    deleteOneUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
          this.users = this.users.filter(user => user.id !== id)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.showActivities()
        })
    }
  }
}

</script>

<style scoped>

.warning {
  background-color: #f2b4ba;
}
.margin{
  margin-top: 50px;
}
.marginActivities{
  margin-top: 250px;
}
.marginAll{
  margin: 50px;
  padding-top: 30px;
}
.fixed{
  top: 10px;
  position: fixed;
  background: #555;
  color: #f1f1f1;
  width:100%;
  z-index: 1000;
}

#titleBackground {
  background-color: lightgrey;
  padding: 10px;
}

h2{
  font-family: Candara;
}
button{
  margin-top: 40px;
  font-family: "Adobe Fan Heiti Std B";
  font-size: 1em;
  background-color: red;
  color: white;
  border: none;
}
button{
  margin-top: 40px;
  font-family: "Adobe Fan Heiti Std B";
  font-size: 1em;
  background-color: red;
  color: white;
  border: none;
}
</style>
