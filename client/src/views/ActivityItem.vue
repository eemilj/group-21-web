<template>
<div class='activity-item' >

  <p>
    <input type="checkbox" v-model="Show"/>

    <button @click="$emit('del-activity', activity._id )" class="del">x</button>
    <button @click="$emit('update-activity', activity._id )" class="update">Update</button>

    <b>{{"Activity Name :   "}}</b>
    {{activity.name}}
<br>
    <b>{{"Activity Type :  "}}</b>
    {{activity.activity_type}}

  </p>
</div>
</template>

<script>
export default {
  name: 'ActivityItem',
  props: ['activity'],
  methods: {
  }
}

</script>

<style scoped>
.activity-item {
  background: white;
  padding: 10px;
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
  background: blue;
  color: white;
  border: none;
  margin-right: 40px;
  padding: 5px 13px;
  border-radius: 0%;
  cursor: pointer;
  float: right;
}
</style>
