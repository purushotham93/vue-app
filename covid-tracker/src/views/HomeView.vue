<template>
  <div class="home">
    <main-component msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainComponent from '@/components/MainComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    MainComponent,
  },
})
export default class HomeView extends Vue {}
</script>
