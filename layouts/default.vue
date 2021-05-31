<template>
  <div id="app">
    <Header />
    <Nuxt />
    <footer v-if="!$route.path.includes('create')" :class="$route.path === '/' ? 'position-absolute-bottom' : ''">
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
