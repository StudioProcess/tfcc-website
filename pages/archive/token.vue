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
      <b-row class="cmmx-0 mb-5">
        <b-col lg="7" class="cmpx-0">
          <!-- eslint-disable-next-line -->
          <div v-html="token.svg" class="bg-white token-padding" />
        </b-col>
        <b-col lg="5" class="cmpx-0">
          <hr class="mt-0">
          <b-row v-if="token.keywords.length" class="mb-4">
            <b-col cols="5" lg="4">
              <p class="f700 text-uppercase text-smallest">Key values</p>
            </b-col>
            <b-col cols="7" lg="8">
              <p class="f700 text-uppercase text-smaller">{{ token.keywords[0] }}<br>{{ token.keywords[1] }}<br>{{ token.keywords[2] }}</p>
            </b-col>
          </b-row>
          <b-row class="mb-4">
            <b-col cols="5" lg="4">
              <p class="f700 text-uppercase text-smallest">Created</p>
            </b-col>
            <b-col cols="7" lg="8">
              <p class="text-smaller">{{ formatDate(token.generated) }}<br>{{ formatTime(token.generated) }}</p>
            </b-col>
          </b-row>
          <!-- <b-row class="mb-4">
            <b-col cols="5" lg="4">
              <p class="f700 text-uppercase text-smallest">Popularity</p>
            </b-col>
            <b-col cols="7" lg="8">
              <p class="text-smaller mb-0">Views: -</p>
              <p class="text-smaller">Downloads: -</p>
            </b-col>
          </b-row> -->
          <b-row class="mb-4">
            <b-col cols="5" lg="4">
              <p class="f700 text-uppercase text-smallest">Share</p>
            </b-col>
            <b-col cols="7" lg="8">
              <p class="text-smaller mb-0"><a :href="`https://twitter.com/intent/tweet?text=TOKEN FOR CLIMATE CARE using '${token.keywords.join(', ')}'. Have a look: ${baseUrl}/archive/${token.id}&hashtags=tokensforclimatecare`" target="_blank" rel="nofollow">Twitter</a></p>
            </b-col>
          </b-row>
          <hr class="mt-0">
          <b-row class="mt-4">
            <b-col>
              <p class="f700 text-smaller mb-0">
                <a :href="`${baseUrl}/archive/download?id=${token.id}`" class="d-block d-lg-none" target="_blank"><span class="material-icons mr-1">arrow_downward</span>Download PNG</a>
                <a href="" class="d-none d-lg-block" @click.prevent="downloadToken('png')"><span class="material-icons mr-1">arrow_downward</span>Download PNG</a>
              </p>
            </b-col>
            <b-col class="text-right">
              <p class="f700 text-smaller mb-0">
                <a href="" class="d-none d-lg-block" @click.prevent="downloadToken('svg')"><span class="material-icons mr-1">arrow_downward</span>Download SVG</a>
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
// dayjs.extend(timezone)

export default {
  data () {
    return {
      baseUrl: process.env.baseUrl,
      url: process.env.apiUrl,
      apiError: '',
      token: {}
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
          } else {
            this.apiError = response.error
          }
        }).catch((error) => {
          // eslint-disable-next-line
          return console.log(error)
        })
      }
    },
    downloadToken (format) {
      this.apiError = ''
      fetch(`${this.url}/${format}?id=${this.$route.query.id}`, {
        method: 'GET',
        headers: {
          Accept: format === 'png' ? 'image/png' : 'image/svg+xml'
        }
      }).then((res) => {
        res.blob().then(blob => this.download(blob, `token_${this.$route.query.id}`))
      }).catch((error) => {
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    download (blob, filename) {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    // Format date
    formatDate (date) {
      return date ? dayjs(date).format('YYYY-MM-DD') : '-'
    },
    // Format time
    formatTime (date) {
      return date ? dayjs(date).format('HH:mm:ss') : '-'
    }
  }
}
</script>
