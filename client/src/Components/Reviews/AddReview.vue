<template>
  <div class="reviewStyle">
    <form @submit.prevent="addReview" class="reviewBox">
      <div>
        <input type="text" v-model="subject" v-validate="'required'" name="subject" placeholder="Subject" class="subject">
        <div
          v-if="errors.has('subject')"
          class="alert alert-danger"
          role="alert"
        >Subject is required!</div>
      </div>
      <div>
        <textarea v-model="content" v-validate="'required'" rows="4" name="content" placeholder="Write review" class="content"/>
        <div
          v-if="errors.has('content')"
          class="alert alert-danger"
          role="alert"
        >Content is required!</div>
      </div>
      <div>
        <select v-model="rating" v-validate="'required'" name="rating" class="rating">
          <option disabled value="">Choose rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <div
          v-if="errors.has('rating')"
          class="alert alert-danger"
          role="alert"
        >Rating is required!</div>
      </div>
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Submit</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddReview',
  data() {
    return {
      id: '',
      reviewee: '',
      subject: '',
      rating: '',
      content: '',
      author: '',
      loading: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addReview(e) {
      this.loading = true
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false
        } else {
          e.preventDefault()
          const newReview = {
            id: this.id,
            reviewee: this.$route.params.id,
            subject: this.subject,
            rating: this.rating,
            content: this.content,
            author: this.currentUser.user.id
          }
          this.$emit('add-review', newReview)
          this.id = ''
          this.reviewee = ''
          this.name = ''
          this.rating = ''
          this.content = ''
          this.author = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.reviewStyle{
  padding: 20px;
  background: navajowhite;
}
.reviewBox{
  min-width: fit-content;
  margin-bottom: 3%;
}
.subject{
  width: 80%;
}
.content{
  margin-top: 10px;
  width: 80%;
}
.btn{
  margin-top: 2%;
  background: #007bff;
  border: 1px #ccc dotted;
  width: 25%;
  position: absolute;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

.rating {
  margin-bottom: 5%;
}
</style>
