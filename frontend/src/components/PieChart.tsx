"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import apiClient from '@/api';

const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

interface ApiResponse {
  labels: string[];
  data: number[];
}

interface PieChartProps {
  apiEndpoint: string;
}

const PieChart: React.FC<PieChartProps> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);
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
              data: data.data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 1,
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

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'white',
          boxWidth: 12,
          padding: 8,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  if (isLoading) return <div className="flex items-center justify-center h-full text-white text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-center text-sm">{error}</div>;

  return (
    <div className="w-full h-full max-w-[600px] max-h-[400px] min-w-[250px] min-h-[250px]">
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
};

export default PieChart;