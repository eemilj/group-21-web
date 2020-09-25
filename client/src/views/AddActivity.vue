<template>
  <div>
    <form @submit="addActivity">
      <input type="text" v-model="name" name="name" placeholder="Add Activity Name ...">
      <input type="text" v-model="activity_type" name="activity_type" placeholder="Add Activity Type...">

      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
</template>

<script>
import uuid from 'uuid'
export default {
  name: 'AddActivity',

  data() {
    return {
      name: '',
      activity_type: ''
    }
  },
  methods: {
    addActivity(e) {
      e.preventDefault()
      const newActivity = {
        id: uuid.v4(),
        name: this.name,
        activity_type: this.activity_type,
        completed: false

      }
      this.$emit('add-activity', newActivity)
      this.name = ''
      this.activity_type = ''
    }
  }
}
</script>

<style scoped>
form{
  display: flex;
}
input[type="text"]{
  flex:10;
  padding:5px;
}

input[type="submit"]{
  flex:2
}
</style>
