<template>
  <div class="margin">
    <form class="submit" @submit="addActivity">
      <input class="addClass" type="text" v-model="name" name="name" placeholder="Add Activity Name ...">
      <input class="addClass" type="text" v-model="activity_type" name="activity_type" placeholder="Add Activity Type...">

      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddActivity',

  data() {
    return {
      name: '',
      activity_type: '',
      id: ''
    }
  },
  methods: {
    addActivity(e) {
      e.preventDefault()
      const newActivity = {
        id: this.id,
        name: this.name,
        activity_type: this.activity_type

      }
      this.$emit('add-activity', newActivity)
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
.addClass {
  background-color: #d4edda;
}
.submit {
  background-color: lightgrey;
  width: 50%;
}
.margin {
  margin: 50px;
}
</style>
