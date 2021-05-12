<template>
  <main>
    <b-container v-if="apiError" fluid="md">
      <b-row class="mb-7">
        <b-col class="text-center">
          <p>{{ apiError }}</p>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-if="token.id" fluid="md">
      <b-row class="mb-3 mb-lg-6">
        <b-col>
          <h1 style="word-break:break-all">Token #{{ token.id }}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <img :src="tokenImageSource" width="100%">
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
// const cheerio = require('cheerio')

export default {
  data () {
    return {
      url: process.env.apiUrl,
      apiError: '',
      token: {},
      tokenImageSource: ''
    }
  },
  head () {
    return {
      title: 'TOKENS FOR CLIMATE CARE | Token #' + this.token.id
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
      } else if (!this.$route.query.format) {
        this.apiError = 'No format provided.'
      } else {
        fetch(`${this.url}/token?id=${this.$route.query.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }).then(async (res) => {
          const response = await res.json()
          if (res.ok) {
            this.token = response
            // const $ = cheerio.load(this.token.svg)
            // $('svg').removeAttr('tfcc:keywords tfcc:generated')
            // const svgString = $('body').html()
            this.svgToPNG(this.token.svg, 1000, 1000, 'png', (pngData) => {
              this.tokenImageSource = pngData
            })
          } else {
            this.apiError = response.error
          }
        }).catch((error) => {
          // eslint-disable-next-line
          return console.log(error)
        })
      }
    },
    svgToPNG (svgString, width, height, format, callback) {
      const svgUrl = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }))
      const svgImage = document.createElement('img')
      svgImage.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const canvasCtx = canvas.getContext('2d')
        canvasCtx.fillStyle = 'white'
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
        canvasCtx.drawImage(svgImage, 0, 0, 1000, 1000)
        const imgData = canvas.toDataURL('image/' + format)
        callback(imgData)
      }
      svgImage.src = svgUrl
      // svgImage.crossOrigin = 'anonymous'
    }
  }
}
</script>
