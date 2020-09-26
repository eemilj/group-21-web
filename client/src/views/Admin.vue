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
        .then(response => { this.activities = response.data })
        .catch(error => {
          this.activities = []
          console.log(error)
        })
    },
    updateActivity(patchedActivity, id) {
      // eslint-disable-next-line camelcase
      const { name, activity_type } = patchedActivity
      Api.patch(`/activities/${id}`, {
        name,
        activity_type
      })
        .catch(err => console.log(err))
    },
    deleteActivity(id) {
      Api.delete(`/activities/${id}`)
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
