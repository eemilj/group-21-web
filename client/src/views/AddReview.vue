<template>
  <div class="reviewStyle">
    <form @submit="addReview" class="reviewBox">
      <input type="text" v-model="subject" name="subject" placeholder="Subject" class="subject">
      <br>
      <textarea v-model="content" name="content" placeholder="Write review" class="content"/>
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
      this.reviewee = ''
      this.name = ''
      this.rating = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>
.reviewStyle{
  justify-self: center;
  child-align: left;
  margin-top: 50px;
}
.subject{
}
.content{
  margin-top: 10px;
  min-width: 400px;
  min-height: 200px;
  resize: inherit;
}
.btn{
  margin-top: 10px;
  background: #ffffff;
  border: 1px #ccc dotted;
}
</style>
