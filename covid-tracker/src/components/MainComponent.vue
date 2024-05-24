<template>
  <div class="charts-container">
    <template v-if="!hasError">
      <BarChart
        :stats-data="latestStats"
        title="Latest Covid Cases"
        containerClass="chart-container"
      ></BarChart>
      <DoughnutChart
        :stats-data="latestStats"
        containerClass="chart-container"
        title="Discharged Cases"
      ></DoughnutChart>
      <LineChart
        :hospital-data="hospitalData"
        title="Hospitals"
        containerClass="chart-container"
      ></LineChart>
    </template>
    <div class="error-message" v-show="hasError">
      Issue on rendering charts... Please try again.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { LatestStats, HospitalStats } from '../models/summary';
import BarChart from './BarChart.vue';
import DoughnutChart from './DoughnutChart.vue';
import LineChart from './LineChart.vue';

@Component({
  components: {
    BarChart,
    DoughnutChart,
    LineChart,
  },
})
export default class MainComponent extends Vue {
  @Action
  getLatestCovidStats!: () => void;

  @Action
  getHospitalInfo!: () => void;

  @State
  latestStats!: LatestStats;

  @State
  hospitalData!: HospitalStats;

  hasError = false;

  async mounted() {
    try {
      await this.getLatestCovidStats();
      await this.getHospitalInfo();
    } catch (error) {
      console.log('error');
      this.hasError = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.charts-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}
.error-message {
  margin: 0 auto;
  padding: 0 20px;
}
</style>
