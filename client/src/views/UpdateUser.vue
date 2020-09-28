<template>
  <div class="margin">
    <form class="submit" @submit="UpdateUser">
      <input class="updateClass" type="text" v-model="admin" name="admin" placeholder="Update Admin Status ...">

      <input type="submit" value="Submit" class="btn"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateUser',

  data() {
    return {
      admin: ''
    }
  },
  methods: {
    UpdateUser(e) {
      e.preventDefault()
      const updateUser = {
        admin: this.admin
      }
      this.$emit('update-activity', updateUser)
      this.admin = ''
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
