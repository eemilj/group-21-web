<template>
  <div>
    <header class="grpHeader">Groups</header>
  <div class="groups">
    <div class="flex-md-column p-lg-5 col-6">
    <div v-for="group in groups" v-bind:key="group._id" class="media">
      <GroupItem v-bind:group="group"/>
    </div>
    </div>
    <div class="flex-sm-column p-lg-5 col-2">
      <AddGroup v-on:add-group="addGroup"/>
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
      const { name, activity, location, description } = newGroup
      Api.post('/activities/' + this.$route.params.id + '/groups', {
        name, activity, location, description
      })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.getGroups()
        })
    }
  }
}
</script>

<style scoped>
.groups{
  display: flex;
  justify-content: space-evenly;
  background: #fffcbe
}
.grpHeader{
  font-size: 40px;
  font-family: Cambria;
  background: #fffcbe
}
</style>
