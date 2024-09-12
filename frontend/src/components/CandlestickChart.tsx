import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import apiClient from '@/api';

// Dynamically import ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickData {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  apiEndpoint: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ apiEndpoint }) => {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<{ data: CandlestickData[] }>(apiEndpoint);
        const candlestickData = response.data.data;

        setSeries([{
          data: candlestickData.map(item => ({
            x: new Date(item.x).getTime(),
            y: [item.open, item.high, item.low, item.close]
          }))
        }]);
      } catch (error) {
        console.error('Error fetching candlestick data:', error);
        setError('Failed to load candlestick data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: '100%',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '10px',
        },
      },
      axisBorder: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      axisTicks: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '10px',
        },
      },
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00B746',
          downward: '#EF403C',
        },
      },
    },
  };

  if (isLoading) return <div className="flex items-center justify-center h-full text-white text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-center text-sm">{error}</div>;

  return (
    <div className="w-full h-full max-w-[600px] max-h-[400px] min-w-[250px] min-h-[250px]">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height="100%"
      />
    </div>
  );
};

export default CandlestickChart;