<template>
  <div id="users">

    <div v-bind:key="user.id" v-for="user in users">

      <UserItem v-bind:user="user"
                v-on:del-user="$emit('del-user', user._id)"
                v-on:update-user="$emit('update-user', user._id)"
                v-on:update-admin="$emit('update-admin', user._id)"
      />

    </div>

  </div>
</template>

<script>
import UserItem from './UserItem'

export default {
  name: 'Users',
  components: { UserItem },
  props: ['users']
}
</script>

<style scoped>

</style>
