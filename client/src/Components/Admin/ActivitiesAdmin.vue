<template>
  <div id="activities">

    <div v-bind:key="activity._id" v-for="activity in activities">

      <ActivityItem v-bind:activity="activity"
                    v-on:del-activity="$emit('del-activity', activity._id)"
                    v-on:update-activityName="$emit('update-activityName', activity._id)"
                    v-on:update-activityType="$emit('update-activityType', activity._id)"
      />

    </div>

  </div>
</template>

<script>
import ActivityItem from './ActivityItem'

export default {
  name: 'ActivitiesAdmin',
  components: { ActivityItem },
  props: ['activities']
}
</script>

<style scoped>

</style>
