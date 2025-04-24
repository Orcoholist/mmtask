<template>
    <div class="articles-container">
      <input
        v-model="searchQuery" 
        placeholder="Поиск" 
        class="search-input"
      />
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="error" class="error">Error: {{ error.message }}</div>
      <div v-else class="articles-list">
        <div v-if="filteredPosts.length === 0" class="no-results">
          Ничего не найдено
        </div>
        <div 
          v-for="post in filteredPosts" 
          :key="post.id" 
          class="article-item"
        >
          <div class="article-content">
            <h2 class="article-title">{{ post.title }}</h2>
            <p class="article-body">{{ post.body }}</p>
          </div>
          <button 
            @click="toggleFavorite(post.id)"
            class="favorite-button"
            :class="{ 'is-favorite': isFavorite(post.id) }"
          >
            {{ isFavorite(post.id) ? 'Удалить из избранного' : 'Добавить в избранное' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import { POSTS_QUERY } from '@/graphql/queries'
  import { useFavoritesStore } from '@/stores/favoritesStore'
  
  const searchQuery = ref('')
  const favoritesStore = useFavoritesStore()
  
  const { result, loading, error } = useQuery(POSTS_QUERY, {
        options: { paginate: { limit: 10 } 
    }  
  })
  
  const posts = computed(() => result.value?.posts?.data || [])
  console.log( result);
  const filteredPosts = computed(() => 
    posts.value.filter(post => 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
  
  function toggleFavorite(id: number) {
    if (favoritesStore.isFavorite(id)) {
      favoritesStore.removeFavorite(id)
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favoritesStore.addFavorite(id)
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  function isFavorite(id: number) {
    return favoritesStore.isFavorite(id)
  }
  </script>

<style scoped>
.articles-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.search-input {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading,
.error {
  text-align: center;
  margin-top: 20px;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-item {
  border: 1px solid #ddd;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
}

.article-content {
  width: 50%;
  flex-grow: 1;
  margin-right: 15px;
}

.article-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.favorite-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.favorite-button:not(.is-favorite) {
  background-color: #4caf50;
  color: white;
}

.favorite-button.is-favorite {
  background-color: #f44336;
  color: white;
}
</style>
