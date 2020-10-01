<template>
  <div class="reviewItem">
      <b-button @click="$emit('del-review', review._id)" class="m-md-2">Delete</b-button>
    <h3> {{review.subject}}</h3>
    <div class="justify-content-end">
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
.reviewItem{
  padding: 20px;
  border-bottom: 1px #ccc dotted;
  border-top: 1px #ccc dotted;;
  text-align: left;
  min-width: 1300px;
  max-width: 1300px;
}
.m-md-2{
  justify-self: right;
  float: right;
  margin: 5px;
  background: #ff230d;
}

</style>
