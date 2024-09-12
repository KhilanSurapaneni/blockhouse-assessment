# Next.js and Django API Integration - Blockhouse Coding Challenge

This is a web application that uses **Next.js** for the frontend and **Django** for the backend API. The frontend provides a dynamic dashboard with multiple chart types (Candlestick, Line, Bar, Pie), and the data for these charts is fetched from the Django API. You can scroll through the charts using the carousel.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Libraries and Tools Used](#libraries-and-tools-used)
- [Approach and Thought Process](#approach-and-thought-process)

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Docker**
- **Docker Compose**

### Installation

1. Clone the repository (Optional):

```bash
git clone 
cd blockhouse-test
```

2. Ensure the project structure is as follows:

```
root
│
├── backend
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   └── <other Django files>
│
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   └── <other Next.js files>
│
└── docker-compose.yml
```

### Running the Application

1. Build and run the application using Docker Compose:

```bash
docker-compose up -d --build
```

2. After the build completes, the services will be available at the following URLs:
   - **Frontend (Next.js)**: `http://localhost:3000`
   - **Backend (Django API)**: `http://localhost:8000`

To stop the application, press `Ctrl + C` or run the following command to stop and remove the containers:

```bash
docker-compose down
```

---

## Libraries and Tools Used

### Backend (Django):
- **Django**: Python web framework.
- **Django REST Framework (DRF)**: For building the API endpoints.
- **CORS Headers**: To allow cross-origin requests from the frontend.

### Frontend (Next.js):
- **Next.js**
- **TypeScript**
- **Axios**
- **Chart.js & ApexCharts**: For rendering the charts on the dashboard.

### Containerization:
- **Docker**: For containerizing both the Django backend and the Next.js frontend.
- **Docker Compose**: For both services together.


---

## Approach and Thought Process

### Frontend:

- **Component-Based Architecture**: Each chart (Line, Bar, Pie, Candlestick) is placed in its own reusable React component. This helps in maintaining a clean structure and makes it easy to add new charts in the future.
- **Axios for API Calls**: A centralized Axios instance is used for making HTTP requests to the Django API. This allows for better control over API requests and makes it easier to switch to a different API endpoint (e.g., production).
- **Chart Libraries**: I used `Chart.js` for the Line, Bar, and Pie charts due to its simplicity and ease of use. For the Candlestick chart, I chose `ApexCharts` as it offers more robust features for financial data visualization.

### Backend:

- **Django REST Framework (DRF)**: I used DRF to quickly create the required API endpoints.
- **Static Data**: The data for the charts is hardcoded, but functions for generating random data were implemented to make the API calls more dynamic.
- **CORS Configuration**: CORS headers were added to allow requests from the frontend.

### Docker:

- **Containerization**: Docker was used to containerize both the backend and frontend applications, making the setup and deployment straightforward. Docker Compose was chosen to orchestrate the two services, ensuring they can be easily started and managed together.

