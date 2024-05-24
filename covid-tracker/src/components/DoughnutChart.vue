<template>
  <div :class="containerClass">
    <template v-if="showChart">
      <Doughnut
        id="my-doughnut-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ChartData,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartOptions,
  Colors,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Colors);
import { LatestStats, Regional } from '../models/summary';

interface CovidData {
  loc: string;
  totalConfirmed: number;
  discharged: number;
}
@Component({
  components: {
    Doughnut,
  },
})
export default class DoughnutChart extends Vue {
  @Prop()
  statsData!: LatestStats;

  @Prop()
  title!: string;

  @Prop()
  containerClass!: string;

  showChart = false;

  chartData: ChartData<'doughnut', number[], unknown> = {
    datasets: [],
  };
  chartOptions: ChartOptions = {};

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

    this.chartData.labels = covidData.map((data) => data.loc);
    console.log('chartData', this.chartData);
    this.chartData.datasets = [
      {
        label: 'Total Discharged',
        data: discharged,
      },
    ];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
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
