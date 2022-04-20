<template>
  <div id="app" class="bg-light bg-gradient min-vh-100">
    <div id="nav" class="mb-4 d-flex justify-content-md-center">
      <router-link to="/"><h5>Home</h5></router-link> |
      <router-link to="/about"><h5>About</h5></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 35px;
  padding-top: 80px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
