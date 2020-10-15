<template>
  <div class='activity-item2' >

    <div class="activity-item">
      <div class="title"> <b> Activity Type</b></div>
      <div class = "contentType"> <b>{{activity.activity_type}}</b></div>

      <div class = "title"> <b> Activity Name</b></div>
      <div class = "contentName overflow-auto"> <b>{{activity.name}}</b></div>
      <div id="enterBar">
        <button @click="$emit('get-activity', activity._id )"  class="enter">Enter</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ActivityItemForClient',
  props: ['activity'],
  data() {
    return {
      Show: false
    }
  }
}

</script>

<style scoped>
.title{
  font-size: large;
  color: lightslategrey;
  padding-top: 20px;
}
.contentType{
  font-size: 30px;
  color: midnightblue;
  padding-top: 20px;
  padding-bottom: 20px;

}
.contentName{
  font-size: 45px;
  color: darkred;
}
.activity-item {
  background: white;
  padding: 3px;
  border: 2px navajowhite solid;
  align-content: baseline;
}
.enter {
  background: none;
  color: darkred;
  font-family: "Arial Nova";
  font-size: 2em;
  border: none;
  width: available;
  border-radius: 0%;
  cursor: pointer;
  padding: 20px;
}
#enterBar {
  background-color: wheat;
  background-blend-mode: color-dodge;
}
*{
  background-color: oldlace;
}
</style>
