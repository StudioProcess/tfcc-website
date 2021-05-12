<template>
  <main>
    <b-container fluid="md">
      <b-row>
        <b-col lg="4">
          <h1>Archive</h1>
        </b-col>
        <b-col lg="4">
          <p class="mt-5 mt-lg-3">All previously generated Tokens are<br>in this archive. New ones added constantly.</p>
        </b-col>
        <b-col lg="4" class="text-right d-none d-lg-block">
          <p class="text-tokens-count f700 mt-3">{{ tokensTotalCount }} Tokens</p>
        </b-col>
      </b-row>
      <hr>
      <b-row class="mb-6">
        <b-col cols="6" lg="8">
          <p class="text-smaller text-uppercase"><span class="material-icons text-smaller mr-1" style="vertical-align:-3px">arrow_downward</span>Settings</p>
        </b-col>
        <b-col cols="6" class="text-right d-block d-lg-none">
          <p class="text-tokens-count f700">{{ tokensTotalCount }} Tokens</p>
        </b-col>
        <!-- <b-col cols="8" lg="2" class="">
          <p class="mb-0" style="line-height:22px">
            <label for="today" class="minimal-radio mb-0">
              <input id="today" name="period" type="radio" value="today" checked="checked">
              <span class="text-smallest">Created today</span>
            </label>
          </p>
          <p class="mb-0" style="line-height:22px">
            <label for="week" class="minimal-radio mb-0">
              <input id="week" name="period" type="radio" value="week">
              <span class="text-smallest">Created this week</span>
            </label>
          </p>
          <p class="mb-0" style="line-height:22px">
            <label for="any" class="minimal-radio mb-0">
              <input id="any" name="period" type="radio" value="any">
              <span class="text-smallest">Created any time</span>
            </label>
          </p>
        </b-col> -->
        <b-col cols="12" lg="2" offset-lg="2" class="">
          <p class="mb-0" style="line-height:22px">
            <label for="newest" class="minimal-radio mb-0">
              <input id="newest" v-model="sortRadioBtn" name="sort" type="radio" value="newest" checked="checked">
              <span class="text-smallest">Newest first</span>
            </label>
          </p>
          <p class="mb-0" style="line-height:22px">
            <label for="oldest" class="minimal-radio mb-0">
              <input id="oldest" v-model="sortRadioBtn" name="sort" type="radio" value="oldest">
              <span class="text-smallest">Oldest first</span>
            </label>
          </p>
        </b-col>
      </b-row>
      <hr>
      <b-row v-if="apiError" class="mt-4">
        <b-col class="mb-4 text-center">
          <p>Token archive cannot be loaded. Please check back later.</p>
        </b-col>
      </b-row>
      <b-row v-if="tokens.length && !apiError" class="mt-4">
        <b-col v-for="token in tokens" :key="token.id" cols="4" lg="2" class="mb-4">
          <!-- eslint-disable-next-line -->
          <NuxtLink :to="'/archive/token?id='+token.id" v-html="token.svg" class="archive-list-item d-block px-3 py-3" />
        </b-col>
      </b-row>
      <b-row v-if="tokens.length && !apiError" class="mb-4">
        <b-col cols="6">
          <p v-if="resultsOffset !== 0" class="text-smallest mt-1 mb-0"><a href="" @click.prevent="pageNav('prev')"><span class="material-icons mr-1">arrow_back</span>Previous Page</a></p>
        </b-col>
        <b-col cols="6" class="text-right">
          <p v-if="resultsOffset + resultsPerPage < tokensTotalCount" class="text-smallest mt-1 mb-0"><a href="" @click.prevent="pageNav('next')">Next Page<span class="material-icons ml-1">arrow_forward</span></a></p>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  data () {
    return {
      url: process.env.apiUrl,
      apiError: true,
      sortRadioBtn: 'newest',
      sortNewestFirst: true,
      resultsPerPage: 24,
      resultsOffset: 0,
      tokens: [],
      tokensTotalCount: 0
    }
  },
  head: {
    title: 'TOKENS FOR CLIMATE CARE | Archive'
  },
  watch: {
    async sortRadioBtn (newValue) {
      this.sortNewestFirst = newValue === 'newest'
      this.$router.push({ path: this.$route.path, query: { p: (this.resultsOffset / this.resultsPerPage) + 1, s: this.sortNewestFirst ? '1' : '-1' } })
      await this.getTokens()
    }
  },
  async mounted () {
    if (this.$route.query.p || this.$route.query.s) {
      this.resultsOffset = this.$route.query.p ? (parseInt(this.$route.query.p) - 1) * this.resultsPerPage : 0
      this.sortNewestFirst = this.$route.query.s !== '-1'
      if (this.$route.query.s === '-1') {
        this.sortRadioBtn = 'oldest'
      }
    } else {
      this.$router.push({ path: this.$route.path, query: { p: '1', s: '1' } })
    }
    await this.getTokens()
  },
  methods: {
    // Fetch tokens list
    getTokens () {
      this.apiError = false
      fetch(`${this.url}/tokens?count=${this.resultsPerPage}&offset=${this.resultsOffset}&newest_first=${this.sortNewestFirst}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then(async (res) => {
        const response = await res.json()
        if (res.ok) {
          this.tokens = response.rows
          this.tokensTotalCount = response.total_rows
        } else {
          this.apiError = true
          // eslint-disable-next-line
          console.log(response.error)
        }
      }).catch((error) => {
        this.apiError = true
        // eslint-disable-next-line
        return console.log(error)
      })
    },
    // Page navigation
    async pageNav (direction) {
      if (direction === 'next') {
        this.resultsOffset += 24
      } else if (direction === 'prev') {
        this.resultsOffset -= 24
      }
      this.$router.push({ path: this.$route.path, query: { p: (this.resultsOffset / this.resultsPerPage) + 1, s: this.sortNewestFirst ? '1' : '-1' } })
      await this.getTokens()
    }
  }
}
</script>
