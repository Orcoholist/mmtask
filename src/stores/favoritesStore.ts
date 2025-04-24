import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<number[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  watch(favoriteIds, (newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  });

  function addFavorite(id: number) {
    if (!favoriteIds.value.includes(id)) {
      favoriteIds.value.push(id);
    }
  }

  function removeFavorite(id: number) {
    favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
  }

  function isFavorite(id: number) {
    return favoriteIds.value.includes(id);
  }

  return { favoriteIds, addFavorite, removeFavorite, isFavorite };
});
