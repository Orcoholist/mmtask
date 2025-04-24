<template>
    <div class="favorites-container">
      <h1>Избранные статьи</h1>
      <div v-if="favorites.length === 0">Нет избранных статей.</div>
      <div v-else class="favorites-list">
        <div v-for="post in favorites" :key="post.id" class="favorite-item">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
          <button @click="removeFavorite(post.id)">Удалить из избранного</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';
  import { useQuery } from '@vue/apollo-composable';
  import { POSTS_QUERY } from '@/graphql/queries';
  
  const favoritesStore = useFavoritesStore();
  

  const { result } = useQuery(POSTS_QUERY, {
    options: { paginate: { limit: 10 } }
  });
  
 
  const favorites = computed(() => {
    const allPosts = result.value?.posts?.data || [];
    return allPosts.filter(post => favoritesStore.isFavorite(post.id));
  });
  

  function removeFavorite(id: number) {
    favoritesStore.removeFavorite(id);
  }
  </script>
  
  <style scoped>
  .favorites-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .favorite-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  </style>
  