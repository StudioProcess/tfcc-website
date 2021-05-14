<template>
  <main>
    <b-container v-if="!$route.query.auth || apiError" fluid="md">
      <b-row style="height:calc(100vh - 80px)">
        <b-col class="my-auto text-center">
          <h1>Error!</h1>
          <h2>This link is invalid.</h2>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-if="queueFull" fluid="md">
      <b-row style="height:calc(100vh - 80px)">
        <b-col class="my-auto text-center">
          <h1>Error!</h1>
          <h2>Queue full.<br>Please try again later.</h2>
        </b-col>
      </b-row>
    </b-container>
    <b-tabs v-if="interaction.id" v-model="tabIndex" no-nav-style>
      <!-- STEP 1: Start -->
      <b-tab active>
        <b-container fluid="md">
          <section>
            <b-row>
              <b-col>
                <h1>Participate</h1>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col class="text-center">
                <p class="h2">Follow these three steps to create your unique Token.</p>
                <p class="mt-5 mb-4"><span class="material-icons" style="font-size:32px">arrow_downward</span></p>
              </b-col>
            </b-row>
          </section>
          <hr>
          <section>
            <b-row>
              <b-col class="text-center">
                <h2 class="text-uppercase mb-3">1 Pick Words</h2>
                <p class="mb-4">Pick three words that describe your issue.</p>
              </b-col>
            </b-row>
          </section>
          <hr>
          <section>
            <b-row>
              <b-col class="text-center">
                <h2 class="text-uppercase mb-3">2 Terms of Care</h2>
                <p class="mb-4">Agree to our terms.</p>
              </b-col>
            </b-row>
          </section>
          <hr>
          <section>
            <b-row class="mb-10">
              <b-col class="text-center">
                <h2 class="text-uppercase mb-3">3 Download/share</h2>
                <p>That's it! You can now download and share your token (optional)</p>
              </b-col>
            </b-row>
          </section>
        </b-container>
        <div class="fixed-bottom bg-white" style="border-top:1px solid #000000">
          <b-container fluid="md">
            <section class="py-5" style="cursor:pointer" @click="tabIndex++; component = 'Picker'">
              <b-row class="mx-0">
                <b-col class="text-center">
                  <p class="h1"><span class="material-icons mr-2">arrow_forward</span>Start</p>
                </b-col>
              </b-row>
            </section>
          </b-container>
        </div>
      </b-tab>
      <!-- STEP 2: Word Selector -->
      <b-tab>
        <b-container fluid="md">
          <b-row class="mx-0">
            <b-col class="text-center">
              <p class="f500">Pick three words to generate your individual Token.</p>
            </b-col>
          </b-row>
          <hr class="mb-0">
          <component :is="component" @changed="setSelectedKeywords" />
          <!-- <b-row class="mx-0 wheel-wrapper" no-gutters>
            <b-col>
              <Picker />
            </b-col>
          </b-row> -->
        </b-container>
        <div class="fixed-bottom bg-white" style="border-top:1px solid #000000">
          <b-container fluid="md">
            <b-row class="py-3">
              <b-col xs="auto" class="cursor-pointer" @click="tabIndex--">
                <p class="text-smallest mt-1 mb-0"><span class="material-icons mr-1">arrow_back</span>Back</p>
              </b-col>
              <b-col xs="auto" class="text-center">
                <p class="text-smallest mt-1 mb-0">Step 1 of 3</p>
              </b-col>
              <b-col xs="auto" class="cursor-pointer text-right" @click="tabIndex++">
                <p class="mb-0"><span class="material-icons mr-1">arrow_forward</span><strong>Next</strong></p>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-tab>
      <!-- STEP 3: Terms -->
      <b-tab>
        <b-container fluid="md">
          <b-row>
            <b-col class="text-center">
              <p class="h2">I have read and agree to the terms below.</p>
              <p class="mt-5 mb-6"><span class="material-icons" style="font-size:32px">arrow_downward</span></p>
              <p class="h1 mb-6">Terms of Care</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="mb-5">Dear Citizens, Companies, Organizations and Governments. By using a Token (ie. downloading, sharing, implementation in a project) you agree to the following terms and conditions.</p>
              <p>In short: use the Tokens to make<br>our planet better, not worse.</p>
            </b-col>
          </b-row>
          <div class="section-divider" />
          <b-row class="bg-little-lighter">
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">1</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Taking care for common good</h2>
            </b-col>
          </b-row>
          <b-row class="bg-little-lighter pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">Your use is taking care and strives for the common good.</p>
            </b-col>
          </b-row>
          <div class="section-divider bg-little-lighter" />
          <b-row>
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">2</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">No harm</h2>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">Your use does not harm people, animals or the environment.</p>
            </b-col>
          </b-row>
          <div class="section-divider" />
          <b-row class="bg-little-lighter">
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">3</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Discourse and dignity</h2>
            </b-col>
          </b-row>
          <b-row class="bg-little-lighter pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">Your use respects civil discourse and human dignity.</p>
            </b-col>
          </b-row>
          <div class="section-divider bg-little-lighter" />
          <b-row>
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">4</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Inclusion</h2>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">Your use is as inclusive as possible and does not discriminate against people of different races, genders, sexual orientations and/or religions.</p>
            </b-col>
          </b-row>
          <div class="section-divider" />
          <b-row class="bg-little-lighter">
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">5</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Your responsibility</h2>
            </b-col>
          </b-row>
          <b-row class="bg-little-lighter pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">You take sole responsibility for your project and resulting actions.</p>
            </b-col>
          </b-row>
          <div class="section-divider bg-little-lighter" />
          <b-row>
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">6</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Changes and modification</h2>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">You are allowed to modify, re-mix, adapt or change the Tokens.</p>
            </b-col>
          </b-row>
          <div class="section-divider" />
          <b-row class="bg-little-lighter">
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">7</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Commercial projects</h2>
            </b-col>
          </b-row>
          <b-row class="bg-little-lighter pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">Commercial projects are explicitly allowed.</p>
            </b-col>
          </b-row>
          <div class="section-divider bg-little-lighter" />
          <b-row>
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">8</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Include reference</h2>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">When using a Token, you must include an adequate reference to this project.</p>
            </b-col>
          </b-row>
          <div class="section-divider" />
          <b-row class="bg-little-lighter">
            <b-col cols="2" lg="1" offset-lg="1" class="text-lg-right">
              <span class="h1 pl-2 pl-lg-0">9</span>
            </b-col>
            <b-col cols="10" lg="5" class="text-right text-lg-left">
              <h2 class="h3 mt-3 mb-0 pr-2 pr-lg-0">Share-alike</h2>
            </b-col>
          </b-row>
          <b-row class="bg-little-lighter pt-3">
            <b-col cols="10" lg="5" offset-lg="2">
              <p class="text-smaller mb-0 mt-lg-n3 pl-2 pl-lg-0">When distributing Tokens, you impose the same conditions for their use.</p>
            </b-col>
          </b-row>
          <div class="section-divider bg-little-lighter" />
          <b-row class="mt-4 mb-8">
            <b-col lg="5" offset-lg="2">
              <p class="text-smallest">These terms have partly been inspired by the “Contract for the Web – A global plan of action to make our online world safe and empowering for everyone”. More information at https://contractfortheweb.org.</p>
            </b-col>
          </b-row>
        </b-container>
        <div class="fixed-bottom bg-white" style="border-top:1px solid #000000">
          <b-container fluid="md">
            <b-row class="py-3">
              <b-col xs="auto" class="cursor-pointer" @click="tabIndex--">
                <p class="text-smallest mt-1 mb-0"><span class="material-icons mr-1">arrow_back</span>Back</p>
              </b-col>
              <b-col xs="auto" class="text-center">
                <p class="text-smallest mt-1 mb-0">Step 2 of 3</p>
              </b-col>
              <b-col xs="auto" class="cursor-pointer text-right" @click="tabIndex++; depositInteraction()">
                <p class="mb-0"><span class="material-icons mr-1">arrow_forward</span><strong>I agree</strong></p>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-tab>
      <!-- STEP 4: Waiting -->
      <b-tab>
        <b-container fluid="md">
          <b-row>
            <b-col class="text-center">
              <p class="h2 mb-7">Your Token is being<br>generated.</p>
            </b-col>
          </b-row>
          <b-row v-if="needToQueue">
            <b-col class="text-center">
              <p class="mb-4">Waiting in line...<br>Tokens before you:</p>
            </b-col>
          </b-row>
          <b-row v-if="needToQueue" class="cmmx-0 py-4 bg-white">
            <b-col class="cmpx-0 text-center">
              <p class="h1 mb-0">{{ queuePosition }}</p>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col cols="6" offset="3" lg="2" offset-lg="5" class="text-center">
              <img src="/tfcc_logo.png" class="img-responsive">
            </b-col>
          </b-row>
        </b-container>
        <!-- <div class="fixed-bottom bg-white" style="border-top:1px solid #000000">
          <b-container fluid="md">
            <b-row class="py-3">
              <b-col xs="auto" class="cursor-pointer" @click="tabIndex--">
                <p class="text-smallest mt-1 mb-0"><span class="material-icons mr-1">arrow_back</span>Back</p>
              </b-col>
              <b-col xs="auto" offset="6" class="cursor-pointer text-right" @click="tabIndex++">
                <p class="mb-0"><span class="material-icons mr-1">arrow_forward</span><strong>Next</strong></p>
              </b-col>
            </b-row>
          </b-container>
        </div> -->
      </b-tab>
      <!-- STEP 5: Token generated -->
      <b-tab>
        <b-container v-if="token.id" fluid="md">
          <b-row>
            <b-col class="text-center">
              <p class="h2 mb-5">Token generated!</p>
              <p class="f700">Watch the installation and wait for your token to be projected! Look out for your shape and color!</p>
              <p class="f700 mb-4">Here's the unique URL of your Token.</p>
            </b-col>
          </b-row>
          <b-row class="cmmx-0 py-4 bg-white">
            <b-col class="cmpx-0 text-center">
              <p class="text-smallest mb-0"><a :href="baseUrl + '/archive/token?id=' + token.id" target="_blank">{{ baseUrl }}/archive/token?id={{ token.id }}</a></p>
            </b-col>
          </b-row>
          <b-row class="cmmx-0 my-4 bg-white">
            <b-col class="cmpx-0 text-center">
              <!-- eslint-disable-next-line -->
              <div v-html="token.svg" />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <p class="f700 text-smaller text-uppercase my-2">Token</p>
            </b-col>
            <b-col cols="8">
              <p class="f700 text-smaller text-uppercase my-2" style="word-break:break-all">#{{ token.id }}</p>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="4">
              <p class="f700 text-smaller text-uppercase my-2">Key values</p>
            </b-col>
            <b-col cols="8">
              <p class="f700 text-smaller text-uppercase my-2">{{ token.keywords.join(', ') }}</p>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="4">
              <p class="f700 text-smaller text-uppercase my-2">Share</p>
            </b-col>
            <b-col cols="8">
              <p class="my-2 text-smaller"><a :href="`https://twitter.com/intent/tweet?text=TOKEN FOR CLIMATE CARE using '${token.keywords.join(', ')}'. Have a look: ${baseUrl}/archive/token?id=${token.id}&hashtags=tokensforclimatecare`" target="_blank" rel="nofollow">Twitter</a></p>
            </b-col>
          </b-row>
          <hr>
          <b-row class="mb-8">
            <b-col cols="4">
              <p class="f700 text-smaller text-uppercase my-2">Download</p>
            </b-col>
            <b-col cols="8">
              <p class="my-2 text-smaller">
                <a :href="`${baseUrl}/archive/download?id=${token.id}&format=png`" target="_blank"><span class="material-icons mr-1">arrow_downward</span>Download PNG</a>
              </p>
              <p class="my-2 text-smaller">
                <a href="" class="d-none d-lg-block" @click.prevent="downloadToken()"><span class="material-icons mr-1">arrow_downward</span>Download SVG</a>
              </p>
            </b-col>
          </b-row>
        </b-container>
        <div class="fixed-bottom bg-white" style="border-top:1px solid #000000">
          <b-container fluid="md">
            <b-row class="py-3">
              <b-col cols="3" class="cursor-pointer" @click="restart()">
                <p class="text-smallest mt-1 mb-0"><span class="material-icons mr-1">restart_alt</span>Start again</p>
              </b-col>
              <b-col cols="6" class="text-center">
                <p class="text-smallest mt-1 mb-0">Step 3 of 3</p>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-tab>
    </b-tabs>
  </main>
</template>

<script>
import Picker from '../components/wheelPicker'

export default {
  components: {
    Picker
  },
  data () {
    return {
      tabIndex: 1,
      baseUrl: process.env.baseUrl,
      url: process.env.apiUrl,
      apiError: false,
      queueFull: false,
      interaction: {},
      needToQueue: false,
      queuePosition: null,
      sequence: '',
      tokenId: '',
      token: {},
      defaultBgColor: '250, 249, 231',
      bgColor: '255, 104, 104',
      component: null,
      selectedKeywords: []
    }
  },
  head: {
    title: 'TOKENS FOR CLIMATE CARE | Generate',
    meta: [
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex,nofollow'
      }
    ]
  },
  async mounted () {
    if (this.$route.query.auth) {
      await this.requestInteraction()
    }
  },
  destroyed () {
    this.component = null
    this.setBackgroundColor(this.defaultBgColor)
  },
  methods: {
    // Get selected keywords
    setSelectedKeywords (value) {
      this.selectedKeywords = value
      // const wheel1Options = Array.from(document.querySelectorAll('#keyword1 .select-wrap .select-options li'))
      // const wheel1SelectedOption = wheel1Options.filter(el => el.getAttribute('data-index') === '0')
      // this.selectedKeyword1 = wheel1SelectedOption[0].innerText
      // const wheel2Options = Array.from(document.querySelectorAll('#keyword2 .select-wrap .select-options li'))
      // const wheel2SelectedOption = wheel2Options.filter(el => el.getAttribute('data-index') === '0')
      // this.selectedKeyword2 = wheel2SelectedOption[0].innerText
      // const wheel3Options = Array.from(document.querySelectorAll('#keyword3 .select-wrap .select-options li'))
      // const wheel3SelectedOption = wheel3Options.filter(el => el.getAttribute('data-index') === '0')
      // this.selectedKeyword3 = wheel3SelectedOption[0].innerText
    },
    // Request interaction
    requestInteraction () {
      this.apiError = false
      this.queueFull = false
      fetch(`${this.url}/request_interaction`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.$route.query.auth}`
        }
      }).then(async (res) => {
        const response = await res.json()
        if (res.ok) {
          this.interaction = response
          if (this.interaction.color) {
            this.interaction.color = this.hexToRgb(this.interaction.color)
            this.setBackgroundColor(this.interaction.color)
          }
        } else if (res.status === 423) {
          this.queueFull = true
        } else {
          this.apiError = true
          // eslint-disable-next-line
          console.log(`response error: code: ${res.status} / message: ${response.error}`)
        }
      }).catch((error) => {
        this.apiError = true
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    // Deposit interaction
    depositInteraction () {
      this.apiError = false
      fetch(`${this.url}/deposit_interaction?id=${this.interaction.id}&keywords=${this.selectedKeywords[0]},${this.selectedKeywords[1]},${this.selectedKeywords[2]}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.$route.query.auth}`
        }
      }).then((res) => {
        // const response = await res.json()
        if (res.ok) {
          this.getInteractionUpdates()
        } else {
          this.apiError = true
          // eslint-disable-next-line
          console.log(`error code: ${res.status}`)
        }
      }).catch((error) => {
        this.apiError = true
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    // Get interaction updates
    getInteractionUpdates () {
      // eslint-disable-next-line
      console.log(`getting update`)
      this.apiError = false
      fetch(`${this.url}/interaction_updates?id=${this.interaction.id}${this.sequence ? '&since=' + this.sequence : ''}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.$route.query.auth}`
        }
      }).then(async (res) => {
        if (res.ok) {
          const response = await res.json()
          if (response.queue_position === 0) {
            this.tokenId = response.token_id
            this.getToken()
            this.tabIndex++ // go to next screen
          } else {
            this.needToQueue = true
            this.sequence = response.seq
            this.queuePosition = response.queue_position
            this.getInteractionUpdates()
          }
        } else if (res.status === 504) {
          this.getInteractionUpdates()
        } else {
          this.apiError = true
          // eslint-disable-next-line
          console.log(`error code: ${res.status}`)
        }
      }).catch((error) => {
        this.apiError = true
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    // Get token
    getToken () {
      this.apiError = ''
      fetch(`${this.url}/token?id=${this.tokenId}`, {
        method: 'GET'
      }).then(async (res) => {
        const response = await res.json()
        if (res.ok) {
          this.token = response
        } else {
          this.apiError = true
          // eslint-disable-next-line
          console.log(`response error: code: ${res.status} / message: ${response.error}`)
        }
      }).catch((error) => {
        this.apiError = true
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    // Download token
    downloadToken () {
      this.apiError = ''
      fetch(`${this.url}/svg?id=${this.tokenId}`, {
        method: 'GET',
        headers: {
          Accept: 'image/svg+xml'
        }
      }).then((res) => {
        res.blob().then(blob => this.download(blob, `token_${this.tokenId}`))
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
      // the filename you want
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    // Restart
    async restart () {
      this.tabIndex = 0
      await this.requestInteraction()
    },
    // Set background color
    setBackgroundColor (color) {
      document.querySelector('body').style['background-color'] = `rgba(${color}, 1)`
      document.querySelector('.navbar').style.background = `rgba(${color}, 0.9)`
    },
    // Convert HEX code to RGB values
    hexToRgb (hex) {
      const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
      return rgb.join(', ')
    }
  }
}
</script>

<style>
.wheel-wrapper .col-4:not(:last-child) .vue-wheel-select {
  border-right: 1px solid #FFFFFF;
}
.wheel-wrapper .col-4:not(:last-child) .vue-wheel-select .select-item.selected {
  border-right: 1px solid #000000;
}
</style>
