<template>
  <div id="app" class="container">
    <div class="title animated fadeInDown" id="title">Trang tin tổng hợp</div>
    <nav>
      <router-link to="/">
        <a>Home</a>
      </router-link>
      <router-link to="/news">
        <a>News</a>
      </router-link>
      <router-link to="/world">
        <a>World</a>
      </router-link>
      <router-link to="/about">
        <a>About</a>
      </router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
nav {
  font-family: Open Sans, sans-serif;
  text-align: center;
  word-spacing: 30px;
}

nav a {
  text-decoration: none;
  color: #cad3e0;
  padding: 10px;
}
</style>

