<template>
  <div class='groupItem'  @click="goToGroup">
    <div class="groupItemFormat">
      <h4>{{group.name}}</h4>
      <div class="description">
        {{group.location}}
        <br>
        {{group.startDate}}
        {{group.endDate}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GroupItem',
  props: ['group'],
  methods: {
    goToGroup() {
      this.$router.push('/groups/' + this.group._id)
    }
  }
}

</script>

<style scoped>
.groupItem {
  background: white;
  padding: 30px;
  border: 1px #000000 solid;
  align-content: baseline;
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 100%
}

.groupItemFormat {
  text-align: left;
  float: left;
}
.groupItem{
  background: #b3ff93
}
.groupItem:hover{
  background: #7abaff;
  cursor: pointer;
}
</style>
