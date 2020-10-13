<template>
  <div class="globalMargin">
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
  border: 1px #9f815e solid;
  align-content: baseline;
  margin-top: 3%;
  margin-bottom: 3%;
  min-width: 100%;
  color: darkred;
}

.groupItemFormat {
  text-align: center;
}
.groupItem{
  background-color: wheat;
  background-blend-mode: color-dodge;
}

.groupItem:hover{
  background: #7abaff;
  cursor: pointer;
}
</style>
