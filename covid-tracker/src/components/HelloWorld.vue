<template>
  <div class="hello">
    <BarChart></BarChart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { LatestStats } from '../models/summary';
import BarChart from './BarChart.vue';
@Component({
  components: {
    BarChart,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  @Action
  getLatestCovidStats!: () => void;

  @State
  latestStats!: LatestStats;

  async mounted() {
    console.log('nounted');
    await this.getLatestCovidStats();
    console.log(this.latestStats);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
