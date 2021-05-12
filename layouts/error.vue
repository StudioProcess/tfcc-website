<template>
  <main>
    <b-container fluid="md">
      <b-row class="mb-7">
        <b-col>
          <h1 v-if="error.statusCode === 404">Page not found</h1>
          <h1 v-else>An error occurred</h1>
          <NuxtLink to="/">Back to home</NuxtLink>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: { type: Array, default: () => null }
  }
}
</script>
