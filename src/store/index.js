import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', // Recupera la autenticación desde localStorage
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
      localStorage.setItem('isAuthenticated', status); // Guarda el estado en localStorage
    },
  },
  actions: {
    login({ commit }) {
      commit('setAuthenticated', true); // Cambia el estado cuando el usuario inicia sesión
    },
    logout({ commit }) {
      commit('setAuthenticated', false); // Cambia el estado cuando el usuario cierra sesión
      localStorage.removeItem('isAuthenticated'); // Borra la autenticación
    },
  },
});
