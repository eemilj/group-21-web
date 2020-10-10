<template>
  <div class="container-fluid">
      <b-button @click="$emit('del-review', review._id)" class="m-md-2">Delete</b-button>
    <h3> {{review.subject}}</h3>
    <div class="content">
      <h6> {{review.content}}</h6>
    </div>
  </div>
</template>

<script>
import EditReview from '@/views/EditReview'

export default {
  name: 'ReviewItem',
  props: ['review'],
  components: [
    EditReview
  ]
}
</script>

<style scoped>
.container-fluid{
  padding: 20px;
  border-bottom: 1px #000000 double;
  text-align: left;
}
.m-md-2{
  justify-self: right;
  float: right;
  margin: 5px;
  background: #ff3e31;
}
.content{
  word-wrap: break-word;
}

</style>
