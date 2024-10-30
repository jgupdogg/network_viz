import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BalanceGroupChartProps {
  balanceGroupStats: any;
}

const BalanceGroupChart: React.FC<BalanceGroupChartProps> = ({ balanceGroupStats }) => {
  if (!balanceGroupStats || Object.keys(balanceGroupStats).length === 0) {
    return <p>Loading chart data...</p>;
  }

  const cohorts = Object.keys(balanceGroupStats.sent);
  const sentData = cohorts.map((key) => balanceGroupStats.sent[key]);
  const receivedData = cohorts.map((key) => balanceGroupStats.received[key]);
  const netData = cohorts.map((key) => balanceGroupStats.net[key]);

  const data = {
    labels: ['Sent', 'Received', 'Net'],
    datasets: cohorts.map((cohort, index) => ({
      label: cohort,
      data: [sentData[index], receivedData[index], netData[index]],
      backgroundColor: getColor(index),
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Customer Inflows and Outflows by Balance Group',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  function getColor(index: number) {
    const colors = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'];
    return colors[index % colors.length];
  }

  return (
    <div style={{ padding: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BalanceGroupChart;
