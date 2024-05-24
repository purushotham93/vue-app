<template>
  <div :class="containerClass">
    <template v-if="showChart">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);
import { LatestStats, Regional } from '../models/summary';

interface CovidData {
  loc: string;
  totalConfirmed: number;
  discharged: number;
}
@Component({
  components: {
    Bar,
  },
})
export default class BarChart extends Vue {
  @Prop()
  statsData!: LatestStats;

  @Prop()
  title!: string;

  @Prop()
  containerClass!: string;

  showChart = false;

  chartData: ChartData<'bar', number[], unknown> = {
    datasets: [],
  };
  chartOptions: ChartOptions = {};

  displayChart() {
    const regions = this.statsData?.regional?.map((data: Regional) => data.loc);
    const covidData: CovidData[] = this.statsData?.regional?.map(
      (data: Regional) => {
        const { discharged, totalConfirmed, loc } = data;
        return { discharged, totalConfirmed, loc };
      },
    );
    const totalConfirmed = covidData?.map(
      (data: CovidData) => data.totalConfirmed,
    );
    const discharged = covidData?.map((data: CovidData) => data.discharged);

    this.chartData.labels = covidData.map((data) => data.loc);
    this.chartData.datasets = [
      {
        label: 'Total Confirmed',
        backgroundColor: '#f87979',
        data: totalConfirmed,
      },
      {
        label: 'Total Discharged',
        backgroundColor: 'black',
        data: discharged,
      },
    ];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: this.title,
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    };
    this.showChart = true;
  }

  @Watch('statsData')
  onUpdateStats(latestData: LatestStats) {
    this.displayChart();
  }
}
</script>
