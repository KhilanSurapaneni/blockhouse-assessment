"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import apiClient from '@/api';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

interface ApiResponse {
  labels: string[];
  data: number[];
}

interface LineChartProps {
  apiEndpoint: string;
}

const LineChart: React.FC<LineChartProps> = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
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
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: 'rgb(75, 192, 192)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(75, 192, 192)',
              pointRadius: 4,
              pointHoverRadius: 6,
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

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          font: {
            size: 10,
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  if (isLoading) return <div className="flex items-center justify-center h-full text-white text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-center text-sm">{error}</div>;

  return (
    <div className="w-full h-full max-w-[600px] max-h-[400px] min-w-[250px] min-h-[250px]">
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineChart;