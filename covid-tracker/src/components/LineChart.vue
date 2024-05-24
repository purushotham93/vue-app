<template>
  <div :class="containerClass">
    <template v-if="showChart">
      <LineChartGenerator
        id="my-line-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Line as LineChartGenerator } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ChartData,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  ChartOptions,
  Colors,
  PointElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
);
import {
  LatestStats,
  Regional,
  HospitalStats,
  HospitalRegion,
} from '../models/summary';

interface HospitalsByState {
  state: string;
  ruralHospitals: number;
  urbanHospitals: number;
}
@Component({
  components: {
    LineChartGenerator,
  },
})
export default class LineChart extends Vue {
  @Prop()
  statsData!: LatestStats;

  @Prop()
  hospitalData!: HospitalStats;

  @Prop()
  title!: string;

  @Prop()
  containerClass!: string;

  showChart = false;

  chartData: ChartData<'line', number[], unknown> = {
    datasets: [],
  };
  chartOptions: ChartOptions = {};

  mounted() {
    console.log('this', this.hospitalData);
  }

  displayChart() {
    const regions = this.hospitalData?.regional?.map(
      (data: HospitalRegion) => data.state,
    );
    const covidData: HospitalsByState[] = this.hospitalData?.regional?.map(
      (data: HospitalRegion) => {
        const { urbanHospitals, ruralHospitals, state } = data;
        return { urbanHospitals, ruralHospitals, state };
      },
    );
    const urbanHospitals = covidData?.map(
      (data: HospitalsByState) => data.urbanHospitals,
    );
    const ruralHospitals = covidData?.map(
      (data: HospitalsByState) => data.ruralHospitals,
    );

    console.log(covidData);

    this.chartData.labels = covidData.map((data) => data.state);
    console.log('chartData', this.chartData);
    this.chartData.datasets = [
      {
        label: 'Urban Hospitals',
        data: urbanHospitals,
      },
      {
        label: 'Rural Hospitals',
        data: ruralHospitals,
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

  @Watch('hospitalData')
  onUpdateStats(data: HospitalStats) {
    this.displayChart();
  }
}
</script>

<style scoped>
.chart-container {
  max-width: 100%;
  margin: 0 auto; /* Centers the container horizontally */
  padding: 10px 20px; /* Adds some padding on the sides */
  box-sizing: border-box;
  position: relative;
  min-height: 500px;
}
</style>
