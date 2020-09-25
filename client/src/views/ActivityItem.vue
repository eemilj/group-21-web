<template>
<div class='activity-item' v-bind:class="{
'is-complete':activity.completed}">
  <p>
    <input type="checkbox" v-on:change="markComplete">
    {{activity.title}}
  <button @click="emit('del-activity', activity.id )" class="del">x</button>
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
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
