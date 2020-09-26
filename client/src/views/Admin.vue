<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <button @click="showActivities" >Show All Activities</button>

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

    deleteActivity(id) {
      Api.delete(`/activities/${id}`)
        .then(res => { this.activities = this.activities.filter(activity => activity.id !== id) })
        .catch(err => console.log(err))
    },
    addActivity(newActivity) {
      this.activities = [...this.activities, newActivity]
    },
    showActivities() {
      Api.get('/activities')
        .then(response => { this.activities = response.data })
        .catch(error => {
          this.activities = []
          console.log(error)
        })
    },
    updateActivity() {
      Api.put('/activities')
        .then(response => { this.activities = response.data })
        .catch(error => {
          this.activities = []
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
