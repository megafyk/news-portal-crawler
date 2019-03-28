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
        <p>{{data.dateDiff}}</p>
        <div class="button" v-on:click="openUrl(data.source)">Đọc thêm</div>
      </li>
    </ul>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";
import _ from "lodash";
const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });
const d = new Date();

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
      this.news.forEach(post => {
        const pdate = new Date(post.pubDate);
        const dateDiff = pdate.getDate() - d.getDate();
        post.dateDiff = isNaN(dateDiff)
          ? post.pubDate
          : rtf.format(dateDiff, "day");
      });
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
