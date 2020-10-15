<template>
  <div class='activity-item' >

    <div class="formatActivity">
      <b>{{"User Username :"}}</b>
      {{user.username}}
      <br>
      <b>{{"Admin Status :"}}</b>
      {{user.admin}}
      <br>
      <b>{{"Registration Date :"}}</b>
      {{user.registrationDate}}
      <br>
      <b>{{"ID :"}}</b>
      {{user._id}}
    </div>

    <button @click="$emit('del-user', user._id )" class="del">x</button>
    <button @click="$emit('update-user', user._id )" class="update">Update Username</button>
    <button @click="$emit('update-admin', user._id )" class="update">Update Admin Status</button>

  </div>
</template>

<script>

export default {
  name: 'UserItem',
  props: ['user']
}

</script>

<style scoped>
.activity-item {
  background: white;
  padding: 80px;
  border-bottom: 1px #ccc dotted;
  align-content: baseline;
}

.del {
  background: red;
  color: white;
  border: none;
  padding: 5px 13px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  margin: 5px;
}
.update {
  background: #9fcdff;
  color: black;
  border: none;
  padding: 5px 13px;
  border-radius: 0%;
  margin: 5px;
  text-align: right;
}
.formatActivity {
  text-align: left;
  float: left;
}

</style>
