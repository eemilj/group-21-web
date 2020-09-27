<template>
  <div class='activity-item2' >

    <div class="activity-item">
    <div class="title"> <b> Activity Type</b></div>
    <div class = "contentType"> <b>{{activity.activity_type}}</b></div>

    <div class = "title"> <b> Activity Name</b></div>
    <div class = "contentName"> <b>{{activity.name}}</b></div>
      <button @click="$emit('enter-activity', activity._id, activity.name, activity.activity_type )" class="enter">Enter</button>

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
  margin-top: 20px;
}
.contentType{
  font-size: 30px;
  color: midnightblue;
  margin-top: 20px;

}
.contentName{
  font-size: 45px;
  color: darkred;
}
.activity-item {
  background: white;
  padding: 3px;
  border: 2px #ccc dotted;
  align-content: baseline;
}
.enter {
  background: whitesmoke;
  color: lightgrey;
  border: none;
  width: available;
  border-radius: 0%;
  cursor: pointer;
  margin: 20px;
}
</style>
