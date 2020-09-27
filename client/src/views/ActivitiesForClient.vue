<template>
  <div id="ActivitiesForClient">

    <div v-bind:key="activity4.id" v-for="activity4 in activities2">

      <ActivityItemForClient v-bind:activity="activity4"/>

    </div>

  </div>
</template>

<script>
import ActivityItemForClient from './ActivityItemForClient'

export default {
  name: 'ActivitiesForClient',
  components: { ActivityItemForClient },
  props: ['activities2']
}
</script>

<style scoped>

</style>
