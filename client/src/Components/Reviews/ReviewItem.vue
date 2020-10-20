<template>
  <div class="container-fluid">
      <b-button v-if="review.author === currentUser.user.id" @click="$emit('del-review', review._id)" class="m-md-2">Delete</b-button>
    <h3>{{reviewOwner}} - {{review.subject}}<div class="Stars" :style="rating"></div></h3>
    <div class="content">
      <h6>{{review.content}}</h6>
    </div>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'ReviewItem',
  props: ['review'],
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    rating() {
      return '--rating: ' + this.review.rating + ';'
    }
  },
  mounted() {
    this.getOwner()
  },
  data() {
    return {
      reviewOwner: ''
    }
  },
  methods: {
    getOwner() {
      Api.get('/users/' + this.review.author)
        .then(response => {
          this.reviewOwner = response.data.username
        })
    }
  }
}
</script>

<style scoped>
.container-fluid{
  padding: 20px;
  border-bottom: 1px #6a9876 double;
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

.Stars {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: 100%;
  margin-left: 2%;
}
.Stars::before {
  content: '★★★★★';
  letter-spacing: 3px;
  background: linear-gradient(90deg,  #fc0 var(--percent), #fff var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
