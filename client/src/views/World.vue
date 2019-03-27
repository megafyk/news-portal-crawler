<template>
  <div>
    <input type="text" v-model="search" placeholder="Tìm kiếm bài báo">
    <ul class="blog-post columns-2">
      <li v-for="data in world" :key="data._id">
        <img :src="data.imageUrl">
        <h3>{{data.title}}</h3>
        <p>{{data.description}}</p>
        <div class="button">
          <a v-bind:href="data.source">Đọc thêm</a>
        </div>
      </li>
    </ul>
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
    }
  }
};
</script>
<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
</style>
