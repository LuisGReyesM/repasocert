<script>
  import { ref, onMounted } from 'vue';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../../firebaseConfig.js';
  import Loader from './icons/LoaderIcons.vue';
  import { useRouter } from 'vue-router';


    export default {
        name: 'FormRegisterComponent',
        components: {
          Loader
        },
        setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const successMessage = ref('');
        const isLoading = ref(false); // Estado para mostrar el icono de carga
        const router = useRouter();

        const registerUser = async () => {
          try {
            // Mostrar el icono de carga
            isLoading.value = true;
            await createUserWithEmailAndPassword(auth, email.value, password.value);
            successMessage.value = '¡Registro exitoso!';
            errorMessage.value = '';
            // Aquí podrías redirigir al usuario o realizar otras acciones


              setTimeout(() => {
              isLoading.value = false;
              router.push('/dashboard');
              }, 2000);
            } catch (error) {
            errorMessage.value = 'Error: ' + error.message;
            successMessage.value = '';
            isLoading.value = false; // Detener el icono de carga si ocurre un error
            }
          };

          onMounted(() => {
             if (store.getters.isAuthenticated) {
               router.push('/dashboard'); // Redirige si ya está autenticado
           }
           else{
             console.log('error')
           }
          });

          return {
            email,
            password,
            registerUser,
            errorMessage,
            successMessage,
            isLoading,
          };
      }
    }
</script>

<template>
    <div class="container col-10 col-xs-6 col-sm-6 col-md-4">
        <h1 class="mt-2 formTitle">Crea una cuenta</h1>
        <form @submit.prevent="registerUser" class="mt-2 formLogin">

            <div class="mb-3 formLogin-contenedor">
                <label for="exampleFormControlInput1" class="form-label formLogin-contenedor__label">Correo Electronico</label>
                <input type="email" v-model="email" class="form-control formLogin-contenedor__input" id="exampleFormControlInput1" placeholder="micorreo@ejemplo.com">
            </div>
            <div class="mb-3 formLogin-contenedor">
                <label for="exampleFormControlInput1" class="form-label formLogin-contenedor__label">Constraseña</label>
                <input type="password" v-model="password" class="form-control formLogin-contenedor__input" id="exampleFormControlInput1" placeholder="**************">
            </div>
            <button class="btn btn-primary formLogin-contenedor__button" type="submit" :disabled="isLoading">

              {{ isLoading ? 'Registrando...' : 'Registrarse' }}
            </button>

            <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-success mt-2">{{ successMessage }}</p>
          </form>
          <h4 class="formTextToRegister">Ya tienes una cuenta?  <RouterLink to="/">Haz click aquí!</RouterLink></h4>

          <div v-if="isLoading" >
            <Loader role="status"/>
          </div>
        </div>
</template>
