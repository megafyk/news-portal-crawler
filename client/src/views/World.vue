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
    <div>
      <ul class="blog-post columns-2">
        <li v-for="data in filteredWorld" :key="data._id">
          <img :src="data.imageUrl">
          <h3>{{data.title}}</h3>
          <p>{{data.description}}</p>
          <div class="button" v-on:click="openUrl(data.source)">Đọc thêm</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WorldService from "../services/WorldService.js";

export default {
  name: "world",
  data() {
    return {
      world: [],
      search: ""
    };
  },
  mounted() {
    this.getWorld();
  },
  methods: {
    async getWorld() {
      const response = await WorldService.fetchWorld();
      this.world = response.data.world;
    },
    openUrl(url) {
      window.open(url);
    }
  },
  computed: {
    filteredWorld: function() {
      return this.world.filter(data => {
        return data.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style scoped>

</style>
