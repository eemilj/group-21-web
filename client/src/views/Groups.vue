<template>
  <div class="background">
    <div class="globalMargin">
        <div class="container">
          <div class="header"><em>Groups</em> </div>

          <div class="row">
      <div class="col-12 col-md-6">
        <div class="groups">
          <div v-for="group in groups" v-bind:key="group._id" >
            <GroupItem v-bind:group="group"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="addGroup">
        <AddGroup v-on:add-group="addGroup"/>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import GroupItem from './GroupItem'
import { Api } from '@/Api'
import AddGroup from '@/views/AddGroup'

export default {
  name: 'Groups',
  props: ['group'],
  components: {
    AddGroup,
    GroupItem
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    } else {
      this.getGroups()
    }
  },
  data() {
    return {
      groups: []
    }
  },
  methods: {
    getGroups() {
      Api.get('/activities/' + this.$route.params.id + '/groups')
        .then(response => {
          this.groups = response.data
          console.log(response.data)
        })
    },
    addGroup(newGroup) {
      const { name, activity, location, description, owner, startDate, endDate } = newGroup
      Api.post('/activities/' + this.$route.params.id + '/groups', {
        name, activity, location, description, owner, startDate, endDate
      })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          console.log(startDate + ' ' + endDate)
          this.getGroups()
        })
    }
  }
}
</script>

<style scoped>
.background{
  background: #fffcbe;
}
.addGroup{
  margin: 10%;
}
.grpHeader{
  font-size: 40px;
  font-family: Cambria;
  background: #fffcbe
}
.media{
}

.header{
  font-size: 50px;
  grid-column: 1/5;
  margin: 50px;
  text-align: center;
}
</style>
