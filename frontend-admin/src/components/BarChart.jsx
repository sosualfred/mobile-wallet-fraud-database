// Import necessary modules
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart.js plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const BarChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'API Calls',
        data: data || [400, 600, 430, 480, 450, 600, 320], // Sample data if no data provided
        backgroundColor: '#007BFF', 
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      datalabels: {
        color: '#666', 
        anchor: 'end',
        align: 'top',
        offset: 5,
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },

    layout: {
        padding: {
          top: 30, 
        }
      },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666', 
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, 
        },
        ticks: {
          display: false, 
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
