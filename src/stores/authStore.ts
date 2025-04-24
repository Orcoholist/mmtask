import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router/index.js';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const isAuthenticated = ref(
    token.value !== null && token.value !== undefined
  );

  function login(email: string) {
    const fakeToken = btoa(email);
    token.value = fakeToken;
    localStorage.setItem('token', fakeToken);
    isAuthenticated.value = true;
    router.push('/articles');
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
    isAuthenticated.value = false;
    router.push('/login');
  }

  return { token, isAuthenticated, login, logout };
});
