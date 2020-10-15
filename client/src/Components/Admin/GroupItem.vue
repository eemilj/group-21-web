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
  background: #f5deb3;
  padding-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px #585858 solid;
  align-content: baseline;
  padding-left: 2%;
}

.del {
  background: red;
  color: white;
  border: none;
  padding: 5px 13px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  margin-right: 2%;
}

.formatActivity {
  text-align: left;
  float: left;
}

</style>
