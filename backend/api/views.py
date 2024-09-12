from rest_framework.response import Response
from rest_framework.decorators import api_view
import random
import datetime

# Helper function to generate random candlestick data
def generate_candlestick_data():
    base_date = datetime.date(2023, 1, 1)
    data = []
    for i in range(20):  # 20 days of data
        open_price = random.randint(50, 100)
        high_price = open_price + random.randint(5, 20)
        low_price = open_price - random.randint(5, 15)
        close_price = random.randint(low_price, high_price)
        data.append({
            "x": (base_date + datetime.timedelta(days=i)).strftime("%Y-%m-%d"),
            "open": open_price,
            "high": high_price,
            "low": low_price,
            "close": close_price
        })
    return data

# Candlestick Chart Data View
@api_view(['GET'])
def candlestick_data(request):
    data = {
        "data": generate_candlestick_data()
    }
    return Response(data)

# Line Chart Data View
@api_view(['GET'])
def line_chart_data(request):
    # Generating more complex monthly data for 12 months
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    data = {
        "labels": months,
        "data": [random.randint(50, 300) for _ in range(12)]
    }
    return Response(data)

# Bar Chart Data View
@api_view(['GET'])
def bar_chart_data(request):
    # More complex data for sales across several products in multiple regions
    labels = ["Product A", "Product B", "Product C", "Product D", "Product E"]
    data = {
        "labels": labels,
        "data": [random.randint(100, 500) for _ in labels]
    }
    return Response(data)

# Pie Chart Data View
@api_view(['GET'])
def pie_chart_data(request):
    # More varied pie chart data with 5 different categories
    labels = ["Category A", "Category B", "Category C", "Category D", "Category E"]
    data = {
        "labels": labels,
        "data": [random.randint(50, 500) for _ in labels]
    }
    return Response(data)