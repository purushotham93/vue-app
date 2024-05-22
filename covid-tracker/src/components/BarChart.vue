<template>
  <div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
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

@Component({
  components: {
    Bar,
  },
})
export default class CovidBarChart extends Vue {
  chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      { label: 'Data One', backgroundColor: '#f87979', data: [40, 20, 12] },
    ],
  };
  chartOptions = {
    responsive: true,
  };

  mounted() {
    console.log('this', this.chartData);
  }
}
</script>
