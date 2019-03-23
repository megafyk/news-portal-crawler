<template>
  <div>
    <h1>This is News</h1>
    <h2>{{serverGreetings}}</h2>
  </div>
</template>

<script>
import NewsService from '../services/NewsService.js';

export default {
  name: "news",
  data() {
    return {
      serverGreetings: ""
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    async getNews() {
      const response = await NewsService.fetchNews();
      this.serverGreetings = response.data;
    }
  }
};
</script>
