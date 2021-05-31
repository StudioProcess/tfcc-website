<template>
  <main class="mt-3">
    <b-container fluid="md">
      <b-row v-if="apiError" style="height:100vh">
        <b-col class="my-auto text-center">
          <h1>Error!</h1>
          <h2>{{ apiError }}</h2>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col lg="8" offset-lg="2">
          <img :src="imageSource" width="100%">
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      url: process.env.apiUrl,
      apiError: '',
      imageSource: ''
    }
  },
  head () {
    return {
      title: 'TOKENS FOR CLIMATE CARE | Token #' + this.$route.query.id
    }
  },
  async mounted () {
    await this.getToken()
  },
  methods: {
    getToken () {
      this.apiError = ''
      if (!this.$route.query.id) {
        this.apiError = 'No token ID provided.'
      } else {
        fetch(`${this.url}/png?id=${this.$route.query.id}`, {
          method: 'GET',
          headers: {
            Accept: 'image/png'
          }
        }).then((res) => {
          res.blob().then((blob) => {
            if (blob.type === 'application/json') {
              this.apiError = 'Invalid token.'
            } else {
              const url = window.URL.createObjectURL(blob)
              this.imageSource = url
            }
          })
        }).catch((error) => {
          // eslint-disable-next-line
          return console.log(error)
        })
      }
    }
  }
}
</script>
