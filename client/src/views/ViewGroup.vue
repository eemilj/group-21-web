<template>
  <div class="background">
    <div class="globalMargin">
    <div class="container">
      <div class="header overflow-hidden"><em>{{group.name}}</em> </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="description">
            <h3 class="location"><u>Date: </u></h3>
            <h4> Start date: {{dateNice(group.startDate)}}<br> End date: {{dateNice(group.endDate)}}</h4>
            <h3 class="location"><u>Location: </u></h3>
            <h4> {{group.location}}</h4>
            <br>
            <h3 class="location"><u>Description:</u></h3>
            <h4>{{group.description}}</h4>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="Edit">
            <b-button v-if="groupMemberFlag" class="alert-info2" @click="joinGroup"> Join group </b-button>
            <b-button v-if="groupMemberFlag === false" class="alert-info3" @click="leaveGroup"> Leave group </b-button>
            <b-button v-if="currentUser.user.id === group.owner" class="alert-warning" @click="deleteGroup"> Delete group </b-button>
            <b-button v-if="currentUser.user.id === group.owner" class="alert-info" @click="showEditGroup"> Edit group </b-button>
            <EditGroup v-if="groupFlag" v-on:edit-group="editGroup"></EditGroup>
          </div>
        </div>

        <div class="col-12">
          <h3 class="centering"> <b>Reviews</b> </h3>

          <div class="reviews">
            <div v-for="review in reviews" v-bind:key="review._id" class="media">
              <ReviewItem v-bind:review="review" v-bind:id="review._id" v-on:del-review="deleteReview"/>
            </div>
            <div class="col-12">
              <AddReview v-on:add-review="addReview"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AddReview from '@/Components/Reviews/AddReview'
import ReviewItem from '@/Components/Reviews/ReviewItem'
import EditGroup from '@/Components/Groups/EditGroup'
import dateFormat from 'dateformat'
export default {
  name: 'ViewGroup',
  components: {
    // EditReview,
    ReviewItem,
    AddReview,
    EditGroup
  },
  data() {
    return {
      group: [],
      reviews: [],
      members: [],
      groupMemberFlag: Boolean,
      groupFlag: Boolean
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
      this.groupFlag = false
      this.checkGroupMember()
    }
  },
  methods: {
    dateNice(date) {
      return dateFormat(date, 'dddd, mmmm dS, yyyy')
    },
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
      const { subject, content, rating, reviewee, author } = newReview
      Api.post('/reviews', {
        subject, content, rating, reviewee, author
      })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.getReviews()
          location.reload()
        })
    },
    editGroup(editedGroup) {
      const { name, location, description } = editedGroup
      Api.patch('groups/' + this.$route.params.id, {
        name, location, description
      })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.showGroup()
        })
    },
    deleteReview(id) {
      Api.delete('/reviews/' + id)
        .then(() => {
          this.getReviews()
        })
    },
    editReview(id) {
      Api.patch('reviews/' + id, {
        subject: this.subject, content: this.content, rating: this.rating
      })
    },
    showEditGroup() {
      if (this.groupFlag === false) {
        this.groupFlag = true
      } else {
        this.groupFlag = false
      }
    },
    joinGroup() {
      const newMember = this.currentUser.user.id
      Api.get('/groups/' + this.$route.params.id)
        .then(response => {
          this.members = response.data.regMembers
          this.members.push(newMember)
        })
        .then(() => {
          const regMembers = this.members
          Api.patch('/groups/' + this.$route.params.id, {
            regMembers
          })
          location.reload()
        })
    },
    leaveGroup() {
      const newMember = this.currentUser.user.id
      Api.get('/groups/' + this.$route.params.id)
        .then(response => {
          this.members = response.data.regMembers
          this.members.splice(newMember)
        })
        .then(() => {
          const regMembers = this.members
          Api.patch('/groups/' + this.$route.params.id, {
            regMembers
          })
          location.reload()
        })
    },
    checkGroupMember() {
      Api.get('/groups/' + this.$route.params.id)
        .then(response => {
          this.members = response.data.regMembers
        })
        .then(() => {
          for (let i = 0; i < this.members.length; i++) {
            if (this.members[i] === this.currentUser.user.id) {
              this.groupMemberFlag = false
              return
            }
          }
          this.groupMemberFlag = true
        })
    }
  }
}
</script>

<style scoped>
.header{
  font-size: 50px;
  color: #721c24;
}
.description{
  text-align: left;
  padding-top: 50px;
  border-radius: inherit;
  border-color: #721c24;
  word-wrap: break-word;
  padding-bottom: 10%;
}
.Edit{
  padding-top: 1%;
}
.background{
  background: #fffcbe;
}

.reviews{
  margin-top: 1%;
  background: navajowhite;
  border: 1px #74a26e solid;
}
.alert-warning{
  float: right;
  margin: 20px;
  background: #ff0001;
  border-color: #1b1e21;
  color: #e5f4f7;
}

.alert-info{
  float: right;
  margin: 20px;
  color: #1b1e21;
}

.alert-info2{
  background: #D4EDDA;
  float: right;
  margin: 20px;
  color: #1b1e21;
}
.alert-info3{
  background: #f8b8b8;
  float: right;
  margin: 20px;
  color: #1b1e21;
}

.centering{
  text-align: center;
  color: #721c24;
}
.location{
  text-align: left;
  color: #721c24;
}
</style>
