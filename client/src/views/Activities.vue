<template>
  <div id="activities">
    <h1></h1>
    <div v-bind:key="activity.id" v-for="activity in activities">

      <ActivityItem v-bind:activity="activity" v-on:del-activity="$emit('del-activity', activity._id)" v-on:update-activity="$emit('update-activity', activity._id)" />

    </div>

  </div>
</template>

<script>
import ActivityItem from './ActivityItem'

export default {
  name: 'Activities',
  components: { ActivityItem },
  props: ['activities']
}
</script>

<style scoped>

</style>
