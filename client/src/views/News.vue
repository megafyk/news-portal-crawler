<template>
  <div>
    <div class="search-container">
      <input type="text" v-model="search" id="search-bar" placeholder="Tìm kiếm bài báo hôm nay?">
      <a href="#">
        <img class="search-icon" src="../assets/search-icon.png">
      </a>
    </div>
    <br>
    <br>
    <ul class="blog-post columns-2">
      <li v-for="data in filteredNews" :key="data._id">
        <img :src="data.imageUrl" width="300px">
        <h3>{{data.title}}</h3>
        <p>{{data.description}}</p>
        <div class="button" v-on:click="openUrl(data.source)">Đọc thêm</div>
      </li>
    </ul>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";

export default {
  name: "news",
  data() {
    return {
      news: [],
      search: ""
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    async getNews() {
      const response = await NewsService.fetchNews();
      this.news = response.data.news;
    },
    openUrl(url) {
      window.open(url);
    }
  },
  computed: {
    filteredNews: function() {
      return this.news.filter(data => {
        return data.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style scoped>
</style>
