<template>
  <div>
    <form @submit="addActivity">
      <input type="text" v-model="title" name="title" placeholder="Add Activity...">
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
      title: ''
    }
  },
  methods: {
    addActivity(e) {
      e.preventDefault()
      const newActivity = {
        id: uuid.v4(),
        title: this.title,
        completed: false
      }
      this.$emit('add-activity', newActivity)
      this.title = ''
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
