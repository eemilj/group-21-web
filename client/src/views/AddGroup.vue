<template>
  <div class="groupAdd">
    <div class="globalMargin">
    <h3>Create Group</h3>
    <form @submit="addGroup" class="groupBox">
      <input type="text" v-model="name" name="name" placeholder="Name" class="name">
      <br>
      <input type="text" v-model="location" name="location" placeholder="Location" class="location">
      <br>
      <textarea rows="4" v-model="description" name="description" placeholder="Write description" class="description"/>
      <br>
      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
  </div>
</template>

<script>

export default {
  name: 'AddGroup',
  data() {
    return {
      id: '',
      name: '',
      location: '',
      description: ''
    }
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
        owner: this.currentUser.user.id
      }
      this.$emit('add-group', newGroup)
      this.id = ''
      this.name = ''
      this.location = ''
      this.description = ''
      this.owner = ''
    }
  }
}
</script>

<style scoped>
.groupAdd{
  padding: 10px;
  background: #7abaff;
  border: 1px #1d2124 solid;
  min-width: fit-content;
}
.groupBox{
  min-width: fit-content;
}
.name, .location, .description{
  margin-bottom: 10px;
  max-width: inherit;
  min-width: 80%
}

.btn{
  background: #ffffff;
  border: 1px #ccc dotted;
}
</style>
