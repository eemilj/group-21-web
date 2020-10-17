<template>
  <div class="globalMargin">
      <div class='groupItem'  @click="goToGroup">
    <div class="groupItemFormat">
      <div class="overflow-auto"><h4>{{group.name}}</h4></div>
      <div class="description">
        <div class="overflow-auto">{{group.location}}</div>
        <br>
        Start date: {{dateNice(group.startDate)}}<br> End date: {{dateNice(group.endDate)}}
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import dateFormat from 'dateformat'

export default {
  name: 'GroupItem',
  props: ['group'],
  methods: {
    dateNice(date) {
      return dateFormat(date, 'dddd, mmmm dS, yyyy')
    },
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
