<template>
  <div id="app" class="container">
    <div class="title animated fadeInDown" id="title">Trang tin tổng hợp</div>
    <nav>
      <router-link to="/">
        <a>Trang chủ</a>
      </router-link>
      <router-link to="/news">
        <a>Thời sự</a>
      </router-link>
      <router-link to="/world">
        <a>Thế giới</a>
      </router-link>
      <router-link to="/about">
        <a>Liên hệ</a>
      </router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
nav {
  font-family: Open Sans, sans-serif;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: #cad3e0;
  padding: 10px;
}

.search-container {
  max-width: 500px;
  padding: 50px;
  display: block;
  margin: 0 auto;
}

input#search-bar {
  margin: 0 auto;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  font-size: 1rem;
  border: 1px solid #d0cfce;
  outline: none;
}
input#search-bar:focus {
  border: 1px solid #008abf;
  transition: 0.35s ease;
  color: #008abf;
}
input#search-bar:focus::-webkit-input-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus::-moz-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus:-ms-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}

.search-icon {
  position: relative;
  float: right;
  width: 75px;
  height: 75px;
  top: -62px;
  right: -45px;
}
</style>

