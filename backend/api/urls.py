# api/urls.py
from django.urls import path
from .views import candlestick_data, line_chart_data, bar_chart_data, pie_chart_data

urlpatterns = [
    path('candlestick-data/', candlestick_data, name='candlestick_data'),
    path('line-chart-data/', line_chart_data, name='line_chart_data'),
    path('bar-chart-data/', bar_chart_data, name='bar_chart_data'),
    path('pie-chart-data/', pie_chart_data, name='pie_chart_data'),
]
# /api/candlestick-data/ – Returns JSON data for the Candlestick chart.

# /api/line-chart-data/ – Returns JSON data for the Line chart.

# /api/bar-chart-data/ – Returns JSON data for the Bar chart.

# /api/pie-chart-data/ – Returns JSON data for the Pie chart.