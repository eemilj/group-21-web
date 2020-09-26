<template>
  <div>
    <form @submit="UpdateActivity">
      <input type="text" v-model="name" name="name" placeholder="Update Activity Name ...">
      <input type="text" v-model="activity_type" name="activity_type" placeholder="Update Activity Type...">

      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateActivity',

  data() {
    return {
      name: '',
      activity_type: '',
      id: ''
    }
  },
  methods: {
    UpdateActivity(e) {
      e.preventDefault()
      const updateActivity = {
        id: this.id,
        name: this.name,
        activity_type: this.activity_type

      }
      this.$emit('update-activity', updateActivity)
      this.id = ''
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
