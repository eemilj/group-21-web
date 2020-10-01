<template>
  <div class="addGroup">
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
  methods: {
    addGroup(e) {
      e.preventDefault()
      const newGroup = {
        id: this.id,
        name: this.name,
        location: this.location,
        description: this.description

      }
      this.$emit('add-group', newGroup)
      this.id = ''
      this.name = ''
      this.location = ''
      this.description = ''
    }
  }
}
</script>

<style scoped>
.addGroup{
  float: right;
  padding: 10px;
  background: #7abaff;
  border: 3px #1d2124 solid;
}
.name, .location, .description{
  margin-bottom: 10px;
}
.description{
  min-width: 300px;
  max-width: 300px;
  max-height: 300px;
  resize: none;
}
.btn{
  background: #ffffff;
  border: 1px #ccc dotted;
}
</style>
