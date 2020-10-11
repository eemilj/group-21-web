<template>
  <div>
    <div>
      <form class="submit" @submit="UpdateActivityName">
        <input class="updateClass" type="text" v-model="name" name="name" placeholder="Update Anything ...">
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
      name: ''
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

</style>
