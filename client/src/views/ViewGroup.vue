<template>
  <div class="background">
  <div class="container">
    <div class="header overflow-hidden"> {{group.name}} </div>
    <button class="alert-warning" @click="deleteGroup"> Delete group </button>
    <div class="col-12 col-md-6">
      <div class="description">
        <h3>{{group.location}}</h3>
        <h4>{{group.description}}</h4>
      </div>
    </div>
    <div class="col-12">
      <div class="reviews">
        <h3> Reviews </h3>
        <div v-for="review in reviews" v-bind:key="review._id" class="media">
          <ReviewItem v-bind:review="review" v-bind:id="review._id" v-on:del-review="deleteReview" v-on:edit-review="showEditReview"/>
        </div>
        <div class="col-12">
          <AddReview v-on:add-review="addReview"/>
        </div>
      </div>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    } else {
      this.showGroup()
      this.getReviews()
    }
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
        .then(() => {
          this.$router.push('/activities/')
        })
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
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.getReviews()
        })
    },
    deleteReview(id) {
      Api.delete('/reviews/' + id)
        .then(() => {
          this.getReviews()
        })
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
  text-align: left;
  padding-top: 100px;
  border-radius: inherit;
  border-color: #721c24;
  word-wrap: break-word;
  padding-bottom: 200px;
}

.background{
  background: #fffcbe;
}
.container{
  width: 80%;
}
.reviews{
  background: #7abaff;
  border: 1px #000000 solid;
}
.alert-warning{
  float: right;
  margin: 20px;
  background: #ff0001;
  border-color: #1b1e21;
  color: #e5f4f7;
}
</style>
