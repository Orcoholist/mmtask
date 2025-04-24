<template>
  <div id="app">
    <header>
      <h1>Список статей</h1>
      <nav>
        <router-link to="/articles">Posts</router-link>
        <router-link to="/favorites">Favorites</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background: #f8f9fa;  
  border-bottom: 1px solid #dee2e6;
}

nav {
  margin: 10px 0;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}


</style>
