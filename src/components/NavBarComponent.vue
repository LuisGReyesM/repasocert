<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'NavbarComponent',
    setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch('logout');  // Cambia el estado de autenticación
      router.push('/');           // Redirige al login
    };

    return {
      isAuthenticated: store.getters.isAuthenticated,
      logout
    };
  }
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body mb-4" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand ml-2" href="#">ToDo App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="!isAuthenticated" class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page">Login</RouterLink>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <RouterLink to="/register" class="nav-link">Register</RouterLink>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <button @click="logout" class="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
</template>
