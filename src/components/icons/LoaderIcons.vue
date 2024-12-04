<script>
    export default {
        name: 'LoaderIcons'
    }
</script>

<template>
    <div class="conteneddor-loader">
        <div class="blob"></div>
    </div>
</template>

<style scoped>
.conteneddor-loader {
    position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.616);
  display: flex;
  justify-content: center;
  align-items: center;
}

.blob {
  width: 112px;
  height: 112px;
  display: grid;
  background: rgba(255, 255, 255, 0.616);
  filter: blur(5.6px) contrast(10);
  padding: 11.2px;
  mix-blend-mode: darken;
}

.blob:before,
.blob:after {
  content: "";
  grid-area: 1/1;
  width: 44.8px;
  height: 44.8px;
  background: #474bff;
  animation: blob-rhf26m 2s infinite;
}

.blob:after {
  animation-delay: -1s;
}

@keyframes blob-rhf26m {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(100%, 0);
  }

  50% {
    transform: translate(100%, 100%);
  }

  75% {
    transform: translate(0, 100%);
  }

  100% {
    transform: translate(0, 0);
  }
}

</style>
