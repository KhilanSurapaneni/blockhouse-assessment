"use client"

import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import CandlestickChart from '@/components/CandlestickChart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const charts = [
  { Component: LineChart, endpoint: '/line-chart-data/' },
  { Component: BarChart, endpoint: '/bar-chart-data/' },
  { Component: PieChart, endpoint: '/pie-chart-data/' },
  { Component: CandlestickChart, endpoint: '/candlestick-data/' },
];

const Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Dashboard</h1>
      <Carousel className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <CarouselContent className="space-x-4">
          {charts.map(({ Component, endpoint }, index) => (
            <CarouselItem key={index}>
              <Card className="bg-black border border-gray-700 rounded-lg shadow-lg">
                <CardContent className="flex aspect-square items-center justify-center p-2 sm:p-4 md:p-6">
                  <Component apiEndpoint={endpoint} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors" />
          <CarouselNext className="ml-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors" />
        </div>
      </Carousel>
    </div>
  );
};

export default Page;