<template>
  <div>
    <b-container>
      <form  @submit="addActivity">
        <div class="row">
          <div class="col-12 col-md-6">
            <input class="addClass" type="text" v-model="name" name="name" placeholder="Add Activity Name ...">
            <input class="addClass" type="text" v-model="activity_type" name="activity_type" placeholder="Add Activity Type...">
            <br>
            <input type="submit" value="Submit" class="submit"/>
          </div>
        </div>
      </form>
    </b-container>

  </div>

</template>

<script>
export default {
  name: 'AddActivity',

  data() {
    return {
      name: '',
      activity_type: '',
      id: ''
    }
  },
  methods: {
    addActivity(e) {
      e.preventDefault()
      const newActivity = {
        id: this.id,
        name: this.name,
        activity_type: this.activity_type

      }
      this.$emit('add-activity', newActivity)
      this.id = ''
      this.name = ''
      this.activity_type = ''
    }
  }
}
</script>

<style scoped>
form{
  display: flex;
}
input[type="text"]{
  flex:10;
  padding:5px;
}

input[type="submit"]{
  flex:2
}
.addClass {
  background-color: #d4edda;
}
.submit {
  background-color: lightgrey;
  margin: 3px;
  padding: 7px;
}
.margin {
  margin-left: 100px;
}

</style>
