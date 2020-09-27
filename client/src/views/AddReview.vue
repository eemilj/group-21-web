<template>
  <div class="reviewStyle">
    <form @submit="addReview">
      <input type="text" v-model="subject" name="subject" placeholder="Subject">
      <br>
      <input type="text" v-model="content" name="content" placeholder="Write review">
      <br>
      <input type="number" v-model="rating" name="rating" placeholder="Rating">
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
      content: ''
    }
  },
  methods: {
    addReview(e) {
      e.preventDefault()
      const newReview = {
        id: this.id,
        reviewee: this.$route.params.id,
        subject: this.subject,
        rating: this.rating,
        content: this.content

      }
      this.$emit('add-review', newReview)
      this.id = ''
      this.name = ''
      this.location = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>
.reviewStyle{
  child-align: left;
  margin-bottom: 100px;
  margin-top: 50px;
}
</style>
