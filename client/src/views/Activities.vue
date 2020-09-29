<template>
  <div >
    <div class="header"><em>Activities</em> </div>

    <ActivitiesForClient class="coloumns" v-bind:activities2="activities3" v-on:get-activity="getActivityID" /><ActivitiesForClient/>

  </div>
</template>

<script>
import ActivitiesForClient from '../../Components/ActivitiesForClient'
import { Api } from '@/Api'

export default {
  name: 'Activities',
  components: { ActivitiesForClient },
  data() {
    return {
      activities3: [],
      result: ''
    }
  },
  mounted: function () {
    this.showActivities()
  },
  methods: {
    showActivities() {
      Api.get('/activities')
        .then(response => {
          this.activities3 = response.data
        })
        .catch(error => {
          this.activities3 = []
          console.log(error)
        })
    },
    getActivityID(id) {
      Api.get(`/activities/${id}`)
        .then(response => {
          this.result = this.result.filter(activity => activity.id === id,
            this.$router.push('/activities/' + id + '/groups/'),
            console.log(this.result)
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

.coloumns{
  font-size: 50px;
  display: grid;
  grid-template-columns:repeat(3,1fr);
  grid-auto-rows: minmax(200px, auto);
  margin: 50px;
}

.header{
  font-size: 50px;
  grid-column: 1/5;
  margin: 50px;
  text-align: center;
}

</style>
