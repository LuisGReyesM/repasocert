<script>
import { ref} from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


  export default {
        name: 'FormLoginComponent',
        setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();
        const store = useStore(); // Acceder a Vuex store

    const loginUser = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Usuario autenticado');
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        store.dispatch('login');  // Activa el estado de autenticación
        localStorage.setItem('isAuthenticated', true);

        router.push('/dashboard');  // Redirige al dashboard
      } catch (error) {
        errorMessage.value = 'Error: ' + error.message;
      }

      watch(() => store.getters.isAuthenticated, (newVal) => {
      if (newVal) {
        // Si el usuario está autenticado, redirige al dashboard
        router.push('/dashboard');
      }
    });
    };

    return {
      email,
      password,
      loginUser,
      errorMessage
    };
  }
    }
</script>

<template>
    <div class="container col-10 col-xs-8 col-sm-6 col-md-4">
        <h1 class="mt-2 formTitle">Inicia sesión</h1>
        <form @submit.prevent="loginUser" class="mt-2 formLogin">
            <div class="mb-3 formLogin-contenedor">
                <label for="exampleFormControlInput1" class="form-label formLogin-contenedor__label">Correo Electronico</label>
                <input type="email" v-model="email" class="form-control formLogin-contenedor__input" id="emailInput" placeholder="micorreo@ejemplo.com">
            </div>
            <div class="mb-3 formLogin-contenedor">
                <label for="exampleFormControlInput1" class="form-label formLogin-contenedor__label">Constraseña</label>
                <input type="password" v-model="password" class="form-control formLogin-contenedor__input" id="passwordInput" placeholder="**************">
            </div>
            <button class="btn btn-primary formLogin-contenedor__button" type="submit">
              {{ isLoading ? 'Iniciando' : 'iniciar sesión' }}
            </button>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
        <div v-if="isLoading" >
          <Loader role="status"/>
        </div>
        <h4 class="formTextToRegister">Aún no estás registrado?  <RouterLink to="/register">Haz click aquí!</RouterLink></h4>
    </div>
</template>
