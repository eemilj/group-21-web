<template>
  <div class='group-item' >

    <button @click="$emit('del-group', group._id, group.name )" class="del">x</button>

    <div class="formatActivity">
      <b>{{"Group Name :"}}</b>
      {{group.name}}
    </div>

  </div>
</template>

<script>

export default {
  name: 'GroupItem',
  props: ['group']
}

</script>

<style scoped>
.group-item {
  background: white;
  padding: 80px;
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
