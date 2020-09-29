<template>
  <div id="groups">

    <div v-bind:key="group.id" v-for="group in groups">

      <GroupItem v-bind:group="group"
                    v-on:del-group="$emit('del-group', group._id)"
      />

    </div>

  </div>
</template>

<script>
import GroupItem from './GroupItem'

export default {
  name: 'Groups',
  components: { GroupItem },
  props: ['groups']
}
</script>

<style scoped>

</style>
