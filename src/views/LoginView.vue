<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        v-model="email"
        type="email"
        placeholder="Ваша почта"
        required
        class="login-input"
      />
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const email = ref('');
const authStore = useAuthStore();

function handleLogin() {
  authStore.login(email.value);
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;

}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}
</style>
