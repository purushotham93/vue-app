<template>
  <div class="bar-container">
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
export default class CovidBarChart extends Vue {
  @Prop()
  statsData!: LatestStats;

  showChart = false;

  chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Deaths',
        backgroundColor: '#f87979',
        data: [40, 20, 12],
      },
      {
        label: 'Total Confirmed',
        backgroundColor: 'black',
        data: [40, 20, 12],
      },
    ],
  };
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Prevents automatic skipping of labels
          maxRotation: 90, // Rotates labels by 90 degrees
          minRotation: 0, // Resets minimum rotation to 0 degrees
        },
      },
    },
  };

  mounted() {
    console.log('this', this.statsData);
  }

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

    console.log(covidData);

    this.chartData.labels = covidData.map((data) => data.loc);
    console.log('chartData', this.chartData);
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
    this.showChart = true;
  }

  @Watch('statsData')
  onUpdateStats(latestData: LatestStats) {
    this.displayChart();
  }
}
</script>

<style>
.bar-container {
}
</style>
