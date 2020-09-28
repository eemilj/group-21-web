<template>
  <div class='activity-item' >

    <button @click="$emit('del-user', user._id )" class="del">x</button>

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
    </div>

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
  margin-right: 90px;
  padding: 5px 13px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
.update {
  background: #9fcdff;
  color: black;
  border: none;
  margin-right: 40px;
  padding: 5px 13px;
  border-radius: 0%;
  cursor: pointer;
  float: right;
}
.formatActivity {
  text-align: left;
  float: left;
}

</style>
