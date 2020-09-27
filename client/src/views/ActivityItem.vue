<template>
<div class='activity-item' >

    <button @click="$emit('del-activity', activity._id, activity.name, activity.activity_type )" class="del">x</button>

    <b>{{"Activity Name :   "}}</b>
    {{activity.name}}s
<br>
    <b>{{"Activity Type :  "}}</b>
    {{activity.activity_type}}

  <div class="update">
    <input type="checkbox" v-model="Show"/>
    <b> Update</b>
  </div>
  <span v-if="Show"><UpdateActivity  v-on:update-activity="updateActivity"/>
    <button @click="$emit('update-activity', activity._id, activity.name, activity.activity_type )" class="update">Confirm Update</button></span>

  </div>
</template>

<script>
import UpdateActivity from './UpdateActivity'

export default {
  name: 'ActivityItem',
  components: { UpdateActivity },
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
  background: lightseagreen;
  color: white;
  border: none;
  margin-right: 40px;
  padding: 5px 13px;
  border-radius: 0%;
  cursor: pointer;
  float: right;
}
</style>
