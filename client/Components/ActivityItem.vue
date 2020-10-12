<template>
  <div class='activity-item' >
    <div class="row">
      <div class="col-6 col-md-6">
        <div class="formatActivity">
          <br>
          <b>{{"Activity Name :"}}</b>
          {{activity.name}}
          <br>
          <b>{{"Activity Type :"}}</b>
          {{activity.activity_type}}
        </div>
      </div>
      <div class="col-6 col-md-6">
        <button @click="$emit('update-activityName' , activity._id )" class="update"> Update Name</button>
        <button @click="$emit('update-activityType', activity._id )" class="update"> Update Type</button>
        <button @click="$emit('del-activity', activity._id, activity.name, activity.activity_type )" class="del">x</button>

      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ActivityItem',
  props: ['activity']
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
}
.formatActivity {
  text-align: left;
  float: left;
}

</style>
