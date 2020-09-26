<template>
<div class='activity-item' v-bind:class="{
'is-complete':activity.completed}">

  <p>
    <input type="checkbox" v-on:change="markComplete">
    <b>{{"Activity Name :   "}}</b>
    {{activity.name}}
<br>
    <b>{{"Activity Type :  "}}</b>
    {{activity.activity_type}}
  <button @click="$emit('del-activity', activity.id )" class="del">x</button>
    <button @click="$emit('update-activity', activity.id )" class="update">Update</button>

  </p>
</div>
</template>

<script>
export default {
  name: 'ActivityItem',
  props: ['activity'],
  methods: {
    markComplete() {
      this.activity.completed = !this.activity.completed
    }
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

.is-complete {
  text-decoration: line-through;
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
