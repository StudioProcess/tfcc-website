<template>
  <b-container fluid="md">
    <div class="footer-inner-wrapper">
      <b-row>
        <b-col order="1" order-lg="2" cols="12" lg="6" class="text-lg-right">
          <img v-if="$route.path === '/'" src="/mak_logo.png">
          <p v-if="$route.path === '/'" class="mt-2 mb-0 f700 text-uppercase">Commissioned by MAK, Vienna</p>
          <p v-if="$route.path !== '/'" class="mt-2 mb-0 f700 text-uppercase">#tokensforclimatecare</p>
        </b-col>
        <b-col order="2" order-lg="1" cols="12" lg="6">
          <div class="position-absolute-bottom-lg f700 text-uppercase">
            A project by <a href="https://process.studio" target="_blank" rel="nofollow" class="text-decoration-none">Process - Studio for Art and Design</a>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
