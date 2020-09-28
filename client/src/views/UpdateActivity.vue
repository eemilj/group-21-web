<template>
  <div>
  <div class="margin">
    <form class="submit" @submit="UpdateActivityName">
      <input class="updateClass" type="text" v-model="name" name="name" placeholder="Update Activity Name ...">
      <input type="submit" value="Submit" class="btn"/>
  </form>
  </div>

  </div>
</template>

<script>
export default {
  name: 'UpdateActivity',

  data() {
    return {
      name: '',
      activity_type: ''
    }
  },
  methods: {
    UpdateActivityName(e) {
      e.preventDefault()
      const updateActivityName = {
        name: this.name
      }
      this.$emit('update-activityName', updateActivityName)
      this.name = ''
    },
    UpdateActivityType(e) {
      e.preventDefault()
      const updateActivityType = {
        activity_type: this.activity_type
      }
      this.$emit('update-activityType', updateActivityType)
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
.updateClass {
  background-color: #9fcdff;
}
.submit {
  background-color: lightgrey;
}
.margin {
  margin: 50px;
}
</style>
