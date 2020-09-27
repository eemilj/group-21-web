<template>
  <div >
  <div class="header"><em>Activities</em> </div>

    <ActivitiesForClient class="coloumns" v-bind:activities2="activities3" /><ActivitiesForClient/>

  </div>
</template>

<script>
import ActivitiesForClient from './ActivitiesForClient'
import { Api } from '@/Api'

export default {
  name: 'ActivitiesUser',
  components: { ActivitiesForClient },
  data() {
    return {
      activities3: []
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
