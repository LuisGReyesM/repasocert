<script>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { collection, onSnapshot, Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
import ButtonComponent from '@/components/ButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

    export default {
        name: 'CrudView',
        components: {
            ButtonComponent,
            ModalComponent
        },
        setup() {
            const store = useStore();
            const router = useRouter();
            const tareas = ref([]);

            // Comprobar si el usuario está autenticado antes de cargar el componente
            onBeforeMount(() => {
            if (!store.getters.isAuthenticated) {
                // Si no está autenticado, redirigir al login
                router.push('/');
            }
            });

            // Verificar si el usuario está autenticado antes de cargar
            onBeforeMount(() => {
            if (!store.getters.isAuthenticated) {
                router.push('/');
            }

            // Escuchar datos de Firebase en tiempo real
            const tareasCollection = collection(db, 'tareas');
            onSnapshot(tareasCollection, (snapshot) => {
                tareas.value = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const fechaLimite = data.fechaLimite;

                    // Convertir el Timestamp a Date y formatear la fecha
                    const formattedDate = formatDate(fechaLimite);

                    return {
                        id: doc.id,
                        titulo: data.titulo,
                        descripcion: data.descripcion,
                        estado: data.estado,
                        etiqueta: data.etiqueta,
                        fechaLimite: formattedDate, // Aquí la fecha ya está formateada
                    };
                });
            });
            });

            function formatDate(timestamp) {
            if (!timestamp) return ''; // Si no hay fecha, devuelve vacío

            if (timestamp instanceof Timestamp) {
            const date = timestamp.toDate();

            // Obtener los componentes de la fecha
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
            const year = date.getFullYear().toString().slice(-2); // Obtener los dos últimos dígitos del año

            // Retornar la fecha en formato dd/mm/aa
            return `${day}/${month}/${year}`;
        } else {
            console.error('El valor no es un Timestamp válido:', timestamp);
            return ''; // Retorna un valor vacío si no es un Timestamp válido
        }

            }

            // Método para marcar la tarea como completada
            const completarTarea = async (tareaId) => {
                const tareaRef = doc(db, 'tareas', tareaId);
                await updateDoc(tareaRef, {
                    estado: 'completado'  // Cambiar el estado a 'completado'
                });
            };

            // Método para eliminar la tarea
            const eliminarTarea = async (tareaId) => {
                const tareaRef = doc(db, 'tareas', tareaId);
                await deleteDoc(tareaRef); // Eliminar la tarea de Firebase
            };

            return { tareas, completarTarea, eliminarTarea };
        }
    };

</script>

<template>
    <div class="container col-sm-9">
        <h1 class="formTitle mb-4 mt-2">
            Dashboard
        </h1>
        <table class="table tabla-crud table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Tarea</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Etiqueta</th>
                    <th scope="col">Fecha limite</th>
                    <th scope="col">Completar o eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tarea in tareas" :key="tarea.id">

                    <td>{{ tarea.titulo }}</td>
                    <td>{{ tarea.descripcion }}</td>
                    <td>{{ tarea.estado }}</td>
                    <td>{{ tarea.etiqueta }}</td>
                    <td>{{ tarea.fechaLimite  }}</td>
                    <td>
                        <button @click="completarTarea(tarea.id)" class="btn btn-success btn-sm boton-tarea">Completar</button>
                        <button @click="eliminarTarea(tarea.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <ModalComponent />
        <ButtonComponent />
    </div>
</template>

<style scoped>
    .boton-tarea{
        margin-right: 15px;
    }
</style>
