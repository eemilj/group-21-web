<template>
  <div class='activity-item' >
    <div class="row">
      <div class="col-6 col-md-6">
        <div class="overflow-auto">
          <b>{{"User Username :"}}</b>
          <div class="overflow-auto">{{user.username}}</div>
          <br>
          <b>{{"Admin Status :"}}</b>
          <div class="overflow-auto">{{user.admin}}</div>
          <br>
          <b>{{"Registration Date :"}}</b>
          <div class="overflow-auto">{{user.registrationDate.slice(0,10)}}</div>
          <br>
          <b>{{"ID :"}}</b>
          <div class="overflow-auto">{{user._id}}</div>
        </div>
      </div>
      <div class="col-6 col-md-6">
        <button @click="$emit('del-user', user._id )" class="del">x</button>
        <button @click="$emit('update-user', user._id )" class="update">Update Username</button>
        <button @click="$emit('update-admin', user._id )" class="update">Update Admin Status</button>
      </div>
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
  padding: 40px;
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
}
.formatActivity {
  text-align: left;
  float: left;
}

</style>
