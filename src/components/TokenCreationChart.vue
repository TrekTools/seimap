<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'TokenCreationChart',
  components: { Line },
  props: {
    tokens: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      // Group tokens by date and count cumulative total
      const dateGroups = this.tokens
        .filter(token => token.creationTimestamp)
        .sort((a, b) => a.creationTimestamp - b.creationTimestamp)
        .reduce((acc, token) => {
          const date = new Date(token.creationTimestamp * 1000).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

      // Calculate cumulative sum
      let cumulative = 0;
      const cumulativeData = Object.entries(dateGroups).map(([date, count]) => {
        cumulative += count;
        return { date, total: cumulative };
      });

      return {
        labels: cumulativeData.map(item => item.date),
        datasets: [
          {
            label: 'Total Tokens',
            data: cumulativeData.map(item => item.total),
            fill: false,
            borderColor: '#a5e9f1',
            tension: 0.1,
            pointBackgroundColor: '#a5e9f1'
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          },
          title: {
            display: true,
            text: 'Token Growth Over Time',
            color: 'white',
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  height: 400px;
  margin: 2rem 0;
  padding: 1rem;
  background: #336494;
  border-radius: 8px;
}
</style> 