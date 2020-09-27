<template>
  <div class='activity-item2' >

    <b>{{"Activity Name"}}</b>
    {{activity.name}}s
    <br>
    <b>{{"Activity Type"}}</b>
    {{activity.activity_type}}

  </div>
</template>

<script>

export default {
  name: 'ActivityItemForClient',
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

</style>
