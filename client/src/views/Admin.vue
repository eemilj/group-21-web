<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <layout/>
    <AddActivity v-on:add-activity="addActivity"/>
    <Activities v-bind:activities="activities" v-on:del-activity="deleteActivity"/>
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
        id: 3,
        name: 'hi',
        activity_type: 'soccer',
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
      axios.get('http://localhost:3000/api/activities')
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
