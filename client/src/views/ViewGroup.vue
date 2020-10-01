<template>
  <div class="viewGroup">
    <button class="alert-warning" @click="deleteGroup"> Delete group </button>
    <div class="header"> {{group.name}} </div>
    <div class="description">
      <h3>{{group.location}}</h3>
      <h4>{{group.description}}</h4>
    </div>
    <div class="jumbotron">
      <h3> Reviews </h3>
      <div v-for="review in reviews" v-bind:key="review._id" class="media">
        <ReviewItem v-bind:review="review" v-bind:id="review._id" v-on:del-review="deleteReview" v-on:edit-review="showEditReview"/>
      </div>
    <div class="reviewWrite">
      <AddReview v-on:add-review="addReview"/>
    </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddReview from '@/views/AddReview'
import ReviewItem from '@/views/ReviewItem'
// import EditReview from '@/views/EditReview'

export default {
  name: 'ViewGroup',
  components: {
    // EditReview,
    ReviewItem,
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
    deleteGroup() {
      Api.delete('/groups/' + this.$route.params.id)
      this.$router.push('/groups/')
    },
    getReviews() {
      Api.get('/reviews?reviewee=' + this.$route.params.id)
        .then(response => {
          this.reviews = response.data
        })
    },
    addReview(newReview) {
      const { subject, content, rating, reviewee } = newReview
      Api.post('/reviews', {
        subject, content, rating, reviewee
      })
        .catch(err => console.log(err))
    },
    deleteReview(id) {
      Api.delete('/reviews/' + id)
    },
    hideEditReview() {
      this.showEditModal = false
    },
    editReview(id) {
      Api.patch('reviews/' + id, {
        subject: this.subject, content: this.content, rating: this.rating
      })
    }
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
.text-field{
  min-height: 200px;
  min-width: 200px;
}
.jumbotron{
  display: grid;
  justify-content: center;
}
.editReview{
  border: revert;
}
.alert-warning{
  float: right;
  margin: 20px;
  background: #ff0001;
  border-color: #1b1e21;
  color: #e5f4f7;
}
</style>
