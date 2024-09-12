from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

class ChartDataTests(APITestCase):

    def test_candlestick_data(self):
        """
        Ensure candlestick data API returns correct structure and status code.
        """
        url = reverse('candlestick_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['data'], list)
        self.assertGreater(len(response.data['data']), 0)

    def test_line_chart_data(self):
        """
        Ensure line chart data API returns correct structure and status code.
        """
        url = reverse('line_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)
        self.assertGreater(len(response.data['labels']), 0)

    def test_bar_chart_data(self):
        """
        Ensure bar chart data API returns correct structure and status code.
        """
        url = reverse('bar_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)
        self.assertGreater(len(response.data['labels']), 0)

    def test_pie_chart_data(self):
        """
        Ensure pie chart data API returns correct structure and status code.
        """
        url = reverse('pie_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)
        self.assertGreater(len(response.data['labels']), 0)