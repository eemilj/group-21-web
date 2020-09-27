<template>
<div class='activity-item' >

  <button @click="$emit('del-activity', activity._id, activity.name, activity.activity_type )" class="del">x</button>
  <button @click="$emit('update-activity', activity._id, activity.name, activity.activity_type )" class="update">Confirm Update</button>

  <div class="formatActivity">
    <b>{{"Activity Name :   "}}</b>
    {{activity.name}}
<br>
    <b>{{"Activity Type :  "}}</b>
    {{activity.activity_type}}
  </div>

  </div>
</template>

<script>

export default {
  name: 'ActivityItem',
  props: ['activity'],
  data() {
    return {
      Show: false
    }
  }
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
