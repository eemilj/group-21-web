<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <layout/>
    <AddActivity v-on:add-activity="addActivity"/>
    <Activities v-bind:activities='activities' v-on:del-activity="deleteAcitivity"/>
    <Activities/>
  </div>
</template>

<script>
import Activities from './Activities'
import layout from './layout'
import AddActivity from './AddActivity'
import axios from 'axios'

export default {
  name: 'Admin',
  components: {
    AddActivity,
    Activities,
    layout
  },
  data() {
    return {
      activities: [{
        id: 1,
        title: 'Todo One',
        completed: false
      }]
    }
  },
  methods: {
    deleteActivity(id) {
      this.activities = this.activities.filter(activity => activity.id !== id)
    },
    addActivity(newActivity) {
      this.activities = [...this.activities, newActivity]
    },
    created() {
      axios.get('/api/activities')
        .then(response => {
          for (var i = 0; i < response.data.activities.length; i++) {
            console.log('Activity ' + response.data.activities[i]._id)
          }
        }).catch(error => {
          this.activities = []
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
