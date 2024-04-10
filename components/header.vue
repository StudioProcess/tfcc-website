<template>
  <header class="fixed-top">
    <b-container fluid="md">
      <b-navbar type="light" toggleable="lg">
        <NuxtLink to="/" class="navbar-brand f700 text-uppercase">Tokens for Climate Care</NuxtLink>
        <b-navbar-toggle target="nav-collapse">
          <span class="icon-bar top-bar" />
          <span class="icon-bar middle-bar" />
          <span class="icon-bar bottom-bar" />
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" class="" is-nav>
          <b-navbar-nav class="ml-auto text-center text-lg-left my-4 my-lg-0">
            <li class="nav-item f700 text-uppercase mr-lg-5">
              <NuxtLink to="/project" :class="$route.path.includes('project') ? 'active nav-link' : 'nav-link'">Project</NuxtLink>
            </li>
            <li class="nav-item f700 text-uppercase mr-lg-5">
              <NuxtLink to="/installation" :class="$route.path.includes('installation') ? 'active nav-link' : 'nav-link'">Installation</NuxtLink>
            </li>
            <li class="nav-item f700 text-uppercase mr-lg-5">
              <NuxtLink to="/terms" :class="$route.path.includes('terms') ? 'active nav-link' : 'nav-link'">Terms</NuxtLink>
            </li>
            <li class="nav-item f700 text-uppercase mr-lg-5">
              <a href="/create" :class="$route.path.includes('create') ? 'active nav-link' : 'nav-link'">Create</a>
            </li>
            <li class="nav-item f700 text-uppercase">
              <NuxtLink to="/archive" :class="$route.path.includes('archive') ? 'active nav-link' : 'nav-link'">Archive</NuxtLink>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>
