<template>
<div>
</div>
</template>

<script>
import ReviewItem from '@/views/ReviewItem'

export default {
  name: 'EditReview',
  props: ['review'],
  components: [
    ReviewItem
  ],
  data() {
    return {
      id: '',
      reviewee: '',
      subject: '',
      rating: '',
      startDate: '',
      endDate: '',
      content: ''
    }
  },
  methods: {
    close(e) {
      e.preventDefault()
      this.$emit('close', e)
    },
    editReview(e) {
      e.preventDefault()
      const newReview = {
        _id: this.id,
        subject: this.subject,
        rating: this.rating,
        content: this.content

      }
      this.$emit('edit-review', newReview)
      this.id = ''
      this.name = ''
      this.rating = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>
</style>
