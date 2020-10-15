<template>
  <div class='group-item' >

    <button @click="$emit('del-group', group._id, group.name )" class="del">x</button>

    <div class="formatActivity">
      <b>{{"Group name: "}}</b>
      <a :href="groupLink">{{group.name}}</a>
    </div>

  </div>
</template>

<script>

export default {
  name: 'GroupItem',
  props: ['group'],
  computed: {
    groupLink() {
      return '/groups/' + this.group._id
    }
  }
}

</script>

<style scoped>
.group-item {
  background: #fffdd6;
  padding: 8%;
  border-bottom: 1px #ccc dotted;
  align-content: baseline;
}

.del {
  background: red;
  color: white;
  border: none;
  padding: 5px 13px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}

.formatActivity {
  text-align: left;
  float: left;
}

</style>
