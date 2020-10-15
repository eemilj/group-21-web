<template>
  <div class="container">
    <div class="globalMargin">
    <h3>Create Group</h3>
    <form @submit="addGroup" class="groupBox">
      <input type="text" v-model="name" name="name" placeholder="Name" class="name">
      <input type="text" v-model="location" name="location" placeholder="Location" class="location">
      <datepicker :bootstrap-styling=true v-model="startDate" placeholder="Start date" class="date"></datepicker>
      <datepicker :bootstrap-styling=true v-model="endDate" placeholder="End date" class="date"></datepicker>
      <textarea rows="4" v-model="description" name="description" placeholder="Write description" class="description"/>
      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'AddGroup',
  data() {
    return {
      id: '',
      name: '',
      location: '',
      description: '',
      startDate: '',
      endDate: ''
    }
  },
  components: {
    Datepicker
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addGroup(e) {
      e.preventDefault()
      const newGroup = {
        id: this.id,
        name: this.name,
        location: this.location,
        description: this.description,
        owner: this.currentUser.user.id,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$emit('add-group', newGroup)
      this.id = ''
      this.name = ''
      this.location = ''
      this.description = ''
      this.owner = ''
      this.startDate = ''
      this.endDate = ''
    }
  }
}
</script>

<style scoped>
.container{
  padding: 10px;
  background: #D4EDDA;
  border: 1px #aacfb2 solid;
  min-width: fit-content;
}
.groupBox{
  min-width: fit-content;
}
.name, .location, .description, .date{
  margin-bottom: 10px;
  max-width: inherit;
  min-width: 100%
}

.btn{
  background: #ffffff;
  border: 1px #ccc dotted;
}
#datepicker {
  padding: 10px;
}
</style>
