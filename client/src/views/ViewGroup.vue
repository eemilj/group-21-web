<template>
  <div class="viewGroup">
    <div class="header"> {{group.name}} </div>
    <div class="description">
      <h3>{{group.location}}</h3>
    </div>
    <div class="reviews">
      <div v-for="review in reviews" v-bind:key="review._id" class="media border p-3 mt-3 mb-3">
        <h3> {{review.subject}}</h3>
        <h6> {{review.content}}</h6>
      </div>
    </div>
    <AddReview v-on:add-review="addReview"/>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddReview from '@/views/AddReview'

export default {
  name: 'ViewGroup',
  components: {
    AddReview
  },
  data() {
    return {
      group: '',
      reviews: []
    }
  },
  mounted: function () {
    this.showGroup()
    this.getReviews()
  },
  methods: {
    showGroup() {
      Api.get('/groups/' + this.$route.params.id)
        .then(response => {
          this.group = response.data
        })
    },
    getReviews() {
      Api.get('/reviews?reviewee=' + this.$route.params.id)
        .then(response => {
          this.reviews = response.data
        })
    },
    addReview() {}
  }
}
</script>

<style scoped>
.header{
  font-size: 50px;
}
.description{
  justify-self: left;
  text-align: left;
  margin-top: 100px;
  margin-left: 300px;
  border-radius: inherit;
  border-color: #721c24;
  min-height: 500px;
}
.reviews{
  margin-left: 300px;
  margin-right: 300px;
  text-align: left;
}
.text-field{
  min-height: 200px;
  min-width: 200px;
}

</style>
