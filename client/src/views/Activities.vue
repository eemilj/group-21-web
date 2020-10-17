<template>
  <div class="background">
  <div class="globalMargin">
  <b-container>
    <div >
      <div class="header"><em>Activities</em> </div>

      <ActivitiesForClient v-bind:activities2="activities3" v-bind:id="activities3.id" v-on:get-activity="getActivityID" /><ActivitiesForClient/>
    </div>
  </b-container>
  </div>
  </div>
</template>
<script>
import ActivitiesForClient from '../Components/Activities/ActivitiesForClient'
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
      this.$router.push('/activities/' + id + '/groups/')
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
.background{
  background: #fffcbe;
}

</style>
