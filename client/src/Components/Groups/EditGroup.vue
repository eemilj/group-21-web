<template>
  <div class="groupAdd">
    <div class="globalMargin">
    <h3 class="text">Edit Group</h3>
    <form @submit="editGroup" class="groupBox">
      <input type="text" v-model="name" name="name" placeholder="Name" class="name">
      <input type="text" v-model="location" name="location" placeholder="Location" class="location">
      <datepicker :bootstrap-styling=true v-model="startDate" placeholder="Start date" class="date"></datepicker>
      <datepicker :bootstrap-styling=true v-model="endDate" placeholder="End date" class="date"></datepicker>
      <textarea rows="4" v-model="description" name="description" placeholder="Write description" class="description"/>
      <br>
      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'EditGroup',
  data() {
    return {
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
    editGroup(e) {
      e.preventDefault()
      const editedGroup = {
        name: this.name,
        location: this.location,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$emit('edit-group', editedGroup)
      this.name = ''
      this.location = ''
      this.description = ''
      this.startDate = ''
      this.endDate = ''
    }
  }
}
</script>

<style scoped>
.groupAdd{
  padding: 10px;
  background: #9fcdff;
  border: 1px #1d2124 solid;
  min-width: fit-content;
}
.groupBox{
  min-width: fit-content;
}
.name, .location, .description, .date{
  margin-bottom: 10px;
  min-width: 100%;
}
.text{
  margin-top: 20%;
}
.btn{
  background: #ffffff;
  border: 1px #ccc dotted;
}
</style>
