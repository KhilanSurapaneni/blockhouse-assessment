"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import apiClient from '@/api';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

interface ApiResponse {
  labels: string[];
  data: number[];
}

interface BarChartProps {
  apiEndpoint: string;
}

const BarChart: React.FC<BarChartProps> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ApiResponse>(apiEndpoint);
        const data = response.data;

        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Value',
              data: data.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 1
            },
          ],
        });
      } catch (error) {
        console.error('Error loading chart data:', error);
        setError('Failed to load chart data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadChartData();
  }, [apiEndpoint]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (isLoading) return <div className="flex items-center justify-center h-full text-white text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-center text-sm">{error}</div>;

  return (
    <div className="w-full h-full max-w-[600px] max-h-[400px] min-w-[250px] min-h-[250px]">
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default BarChart;