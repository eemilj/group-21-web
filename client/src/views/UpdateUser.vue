<template>
  <div class="margin">
    <form class="submit" @submit="UpdateUser">
      <input class="updateClass" type="text" v-model="name" name="name" placeholder="Update Admin Status ...">

      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateUser',

  data() {
    return {
      name: ''
    }
  },
  methods: {
    UpdateUser(e) {
      e.preventDefault()
      const updateUser = {
        name: this.name
      }
      this.$emit('update-user', updateUser)
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
  background-color: #ffeeba;
}
.submit {
  background-color: lightgrey;
}
.margin {
  margin: 50px;
}
</style>
