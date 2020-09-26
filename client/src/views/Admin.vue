<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <button @click="showActivities" >Show All Activities</button>
    <button @click="deleteActivities">Delete All Activities</button>

    <AddActivity v-on:add-activity="addActivity"/>
    <Activities v-bind:activities="activities" v-on:del-activity="deleteActivity" v-on:update-activity="updateActivity"/>

    <Activities/>
  </div>
</template>

<script>
import Activities from './Activities'
import AddActivity from './AddActivity'

import { Api } from '@/Api'

export default {
  name: 'Admin',
  components: {
    AddActivity,
    Activities
  },
  data() {
    return {
      activities: []
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
    updateActivity(patchedActivity, id) {
      // eslint-disable-next-line camelcase
      const { name, activity_type } = patchedActivity
      Api.put(`/activities/${id}`, {
        name,
        activity_type
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
    deleteOneActivitiy() {
      var _id = '5f6efba53466b51c6411481d'
      Api.delete(`/activities/${_id}`)
        .then(response => {
          this.activities = this.activities.filter(activity => activity.id !== _id
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
</style>
