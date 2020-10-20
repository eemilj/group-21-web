<template>
  <div>
    <div class="globalMargin">
    <b-jumbotron class="jumbotron jumbotron-fluid bg-dark">
      <div class="jumbotron-background">
        <img src="../assets/jumbotron_image.jpg" class="blur">
      </div>
      <div class="container text-white">
        <div class="header">Hobby Hub!</div>
        <p class="lead">
          Your online place for scheduling activities, events and meetings with other people!
        </p>
        <p class="join">
          <a class="btn btn-info btn-lg" href="/login" role="button">Join the community now!</a>
        </p>
      </div>
    </b-jumbotron>
      <section class="features-icons bg-light text-center">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto">
                <i class="fas fa-running fa-7x"></i>
                <h3>View activities</h3>
                <p class="lead mb-0">Browse through the different kinds of activities and find the most intriguing to your interests!</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto">
                <i class="fas fa-users fa-7x"></i>
                <h3>Join groups</h3>
                <p class="lead mb-0">Join any group that seems interesting to you!</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="features-icons-item mx-auto">
                <i class="fab fa-grav fa-7x"></i>
                <h3>Create groups</h3>
                <p class="lead mb-0">Do you want others to join your events? Create your own group with ease!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
  }
}
</script>

<style>

.features-icons {
  padding-top: 7rem;
  padding-bottom: 7rem;
}

.features-icons .features-icons-item {
  max-width: 20rem;
}

.jumbotron {
  position: relative;
  overflow: hidden;
}

.jumbotron .container {
  position: relative;
  z-index: 2;

  background: rgba(0,0,0,0.2);
  padding: 2rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
}

.jumbotron-background {
  object-fit: cover;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

img.blur {
  -webkit-filter: blur(4px);
  filter: blur(4px);

}

</style>
