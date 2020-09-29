<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <button class = "show" @click="showActivities" >Show All Activities</button>
    <button class="warning" @click="deleteActivities">Delete All Activities</button>

    <AddActivity v-on:add-activity="addActivity"/>
    <UpdateActivity v-on:update-activityName="createNewActivityName"/>
    <ActivitiesAdmin v-bind:activities="activities" v-on:del-activity="deleteOneActivitiy"
                v-on:update-activityName="updateActivityName"
    />
    <button class="show" @click="showGroups" >Show All Groups</button>
    <Groups v-bind:groups="groups" v-on:del-group="deleteOneGroup" />

    <button class="show" @click="showUsers" >Show All Users</button>
    <Users v-bind:users="users" v-on:del-user="deleteOneUser" v-on:update-user="updateUser"/>

  </div>
</template>

<script>
import { Api } from '@/Api'
import ActivitiesAdmin from './ActivitiesAdmin'
import AddActivity from './AddActivity'
import UpdateActivity from './UpdateActivity'
import Groups from './Groups'
import Users from './Users'

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
  methods: {
    addActivity(newActivity) {
      // eslint-disable-next-line camelcase
      const { name, activity_type } = newActivity
      Api.post('/activities', {
        name,
        activity_type
      })
        .catch(err => console.log(err))
    },
    createNewActivityName(newActivity) {
      // eslint-disable-next-line camelcase
      const { name } = newActivity
      this.objectFromHere = name
    },
    createNewUser(newUser) {
      // eslint-disable-next-line camelcase
      const { name2 } = newUser
      this.objectFromHereUser = name2
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
      var name = this.objectFromHere
      Api.patch(`/activities/${id}`, {
        name: name
      })
        .catch(err => console.log(err))
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
    },
    deleteOneActivitiy(id) {
      Api.delete(`/activities/${id}`)
        .then(response => {
          this.activities = this.activities.filter(activity => activity.id !== id
          )
            .catch(error => {
              console.log(error)
            })
        })
    },
    deleteOneGroup(id) {
      Api.delete(`/groups/${id}`)
        .then(response => {
          this.groups = this.groups.filter(group => group.id !== id
          )
            .catch(error => {
              console.log(error)
            })
        })
    },
    deleteOneUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
          this.users = this.users.filter(user => user.id !== id
          )
            .catch(error => {
              console.log(error)
            })
        })
    }
  }
}

</script>

<style scoped>
.deleteAllWarning {
  background: red;
  color: white;
  border: none;
  margin-right: 40px;
  padding: 5px 13px;
  border-radius: 0%;
  cursor: pointer;
  float: right;
}
.warning {
  background-color: #f2b4ba;
  margin: 10px;
}
.show {
  background-color: darkseagreen;
  margin: 10px;
}
</style>
