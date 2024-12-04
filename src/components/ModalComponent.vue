<script>
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import ButtonComponent from './ButtonComponent.vue';
    export default {
        name: 'ModalComponent',
        components: {
            ButtonComponent
        },
        data() {
    return {
      form: {
        titulo: "",
        descripcion: "",
        estado: "",
        etiqueta: "",
        fechaLimite: ""
      },
      loading: false
    };
  },
  methods: {
    async enviarFormulario() {
      if (!this.form.titulo || !this.form.descripcion || !this.form.fechaLimite) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      this.loading = true;
      try {
        const fechaLimiteTimestamp = Timestamp.fromDate(new Date(this.form.fechaLimite));
        await addDoc(collection(db, "tareas"), {
          titulo: this.form.titulo,
          descripcion: this.form.descripcion,
          estado: this.form.estado,
          etiqueta: this.form.etiqueta,
          fechaLimite: fechaLimiteTimestamp,
          creado: new Date()
        });
        alert("Tarea agregada exitosamente.");
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al agregar la tarea:", error);
      } finally {
        this.loading = false;
      }
    },
    limpiarFormulario() {
      this.form = {
        titulo: "",
        descripcion: "",
        estado: "",
        etiqueta: "",
        fechaLimite: ""
      };
    }
    }

}
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agrega una nueva tarea</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="enviarFormulario" class="mt-1">
                        <div class="mb-3 formLogin-contenedor">
                            <label for="titulo" class="form-label formLogin-contenedor__label">Titulo de la tarea</label>
                            <input type="text" v-model="form.titulo"  class="form-control formLogin-contenedor__input" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 formLogin-contenedor">
                            <label for="descripcion" class="form-label formLogin-contenedor__label">Descripción de la tarea</label>
                            <input type="text" v-model="form.descripcion" class="form-control formLogin-contenedor__input" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 formLogin-contenedor">
                            <select v-model="form.estado" class="form-select formLogin-contenedor__input formLogin-contenedor-select__option" aria-label="Default select example">
                                <option value="">Estado</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en-proceso">En Proceso</option>
                                <option value="finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div class="mb-3 formLogin-contenedor">
                            <select v-model="form.etiqueta" class="form-select formLogin-contenedor__input formLogin-contenedor-select__option" aria-label="Default select example">
                                <option value="">Etiqueta</option>
                                <option value="personal">Personal</option>
                                <option value="trabajo">Trabajo</option>
                                <option value="familia">Familia</option>
                            </select>
                        </div>
                        <div class="mb-3 formLogin-contenedor">
                            <label for="fecha" class="form-label formLogin-contenedor__label">Fecha limite</label>
                            <input v-model="form.fechaLimite" class="formSelectDate" type="date" id="fecha" name="fecha" required>
                        </div>
                    </form>
                    <div class="d-flex modal-footer">
                        <ButtonComponent @click="enviarFormulario" type="submit"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
