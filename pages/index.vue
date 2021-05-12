<template>
  <main>
    <b-container fluid="md">
      <b-row>
        <b-col>
          <div class="f700 text-uppercase">
            On view at London Design Biennale<br>
            Somerset House, 1-27 June 2021
          </div>
        </b-col>
        <b-col class="d-none d-lg-block">
          <div class="f700i text-uppercase text-right">
            #tokensforclimatecare
          </div>
        </b-col>
      </b-row>
      <b-row style="height:calc(100vh - 80px - 48px - 155px)">
        <b-col lg="10" offset-lg="1" xl="8" offset-xl="2" class="my-auto text-center">
          <img src="/tfcc_logo_transparent_sticker_desktop.png" width="100%" class="d-none d-lg-block px-md-5">
          <img src="/tfcc_logo_transparent_sticker_mobile.png" width="100%" class="d-block d-lg-none px-md-5">
          <!-- <div class="d-block d-lg-none f700i text-uppercase text-center mt-3">
            #tokensforclimatecare
          </div> -->
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  head: {
    title: 'TOKENS FOR CLIMATE CARE | Start'
  }
}
</script>
