<template>
  <div class="reviewStyle">
    <form @submit="addReview" class="reviewBox">
      <input type="text" v-model="subject" name="subject" placeholder="Subject" class="subject">
      <br>
      <textarea v-model="content" rows="4" name="content" placeholder="Write review" class="content"/>
      <br>
      <select v-model="rating" name="rating">
        <option disabled value="">Choose rating</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <br>
      <input type="submit" value="Submit" class="btn"/>
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
      author: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addReview(e) {
      e.preventDefault()
      console.log(this.currentUser.user.id)
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
  }
}
</script>

<style scoped>
.reviewStyle{
  padding: 20px;
  min-width: fit-content;
  background: #7abaff;
}
.reviewBox{
  min-width: fit-content;
}
.subject{
  width: 80%;
}
.content{
  margin-top: 10px;
  width: 80%;
}
.btn{
  margin-top: 10px;
  background: #ffffff;
  border: 1px #ccc dotted;
}
</style>
