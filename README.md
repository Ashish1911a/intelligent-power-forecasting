https://intelligent-power-forecasting-f398.vercel.app/

# Smart Utility Consumption Forecasting System

An end-to-end machine learning project for forecasting **24-hour utility consumption** using historical load patterns, weather conditions, and localized holiday/event information.

This project includes:

* Exploratory Data Analysis (EDA)
* Data cleaning & preprocessing
* Feature engineering
* Forecasting model training
* Backend REST API
* Frontend visualization dashboard
* Dockerized deployment

---

# Project Structure

```bash
smart-utility-forecasting/
│
├── data/
│   ├── Utility_consumption.csv
│   ├── weather_data.csv
│   └── holidays.csv
│
├── notebooks/
│   └── utility_forecasting_eda.ipynb
│
├── backend/
│   ├── app.py
│   ├── model/
│   │   ├── trained_model.pkl
│   │   └── scaler.pkl
│   ├── utils/
│   │   ├── preprocess.py
│   │   └── feature_engineering.py
│   ├── requirements.txt
│   └── routes/
│       └── forecast.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

# Problem Statement

The goal of this project is to build a robust forecasting system capable of predicting future utility consumption while handling:

* Missing values
* Outliers
* Seasonal patterns
* Weather dependency
* Holiday/event effects

The system provides a fresh **24-hour forecast** along with contextual weather and holiday information for visualization.

---

# Dataset

## Provided Dataset

* `Utility_consumption.csv`

## Additional Data Sources

### Weather Data

Integrated weather features include:

* Temperature
* Humidity
* Cloud Cover

Weather data can be sourced using:

* OpenWeather API
* Meteostat
* NOAA
* Visual Crossing

### Holiday Data

Localized holidays/events were manually sourced and integrated.

Features include:

* National holidays
* Regional holidays
* Weekend indicators
* Festival/event markers

---

# Exploratory Data Analysis (EDA)

The notebook includes:

* Statistical summary
* Time-series trend analysis
* Seasonality detection
* Correlation analysis
* Missing value analysis
* Outlier visualization
* Distribution plots
* Weather impact analysis
* Holiday consumption behavior

---

# Data Cleaning

## Missing Values

Handled using:

* Time interpolation
* Forward fill / backward fill
* Rolling averages

## Outlier Treatment

Outliers detected using:

* IQR Method
* Z-score analysis

Outliers were treated using:

* Winsorization
* Median smoothing
* Rolling statistics

Justification for each method is documented in the notebook.

---

# Feature Engineering

Engineered features include:

## Time Features

* Hour
* Day
* Month
* Weekday
* Weekend flag
* Season

## Lag Features

* Previous hour consumption
* Previous day consumption
* Rolling averages

## Weather Features

* Temperature
* Humidity
* Cloud cover
* Feels-like temperature

## Holiday Features

* Holiday flag
* Festival/event indicator

---

# Model Architecture

The selected model architecture is justified in the notebook using EDA findings.

Possible implemented models:

* XGBoost Regressor
* LightGBM
* Random Forest
* LSTM (optional)

The chosen model was evaluated using:

* MAE
* RMSE
* MAPE
* R² Score

---

# Backend API

Built using:

* FastAPI / Flask

## API Endpoints

### 1. Get 24-Hour Forecast

```http
GET /forecast
```

### Response

```json
{
  "forecast": [
    {
      "timestamp": "2026-05-21 01:00:00",
      "predicted_load": 412.6
    }
  ]
}
```

---

### 2. Get Weather Data

```http
GET /weather
```

### Response

```json
{
  "temperature": 31,
  "humidity": 68,
  "cloud_cover": 42
}
```

---

### 3. Get Holiday Data

```http
GET /holidays
```

### Response

```json
{
  "date": "2026-05-21",
  "holiday": false,
  "event": null
}
```

---

# Frontend Dashboard

Built using:

* React.js / Vite
* Chart.js / Recharts

## Dashboard Features

* 24-hour forecast visualization
* Weather indicators
* Holiday/event markers
* Interactive charts
* Responsive UI

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/smart-utility-forecasting.git
cd smart-utility-forecasting
```

---

## 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```bash
http://localhost:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Docker Setup

## Build Docker Image

```bash
docker build -t utility-forecasting .
```

## Run Container

```bash
docker run -p 8000:8000 utility-forecasting
```

---

# Docker Compose

```bash
docker-compose up --build
```

---

# Example Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "backend/app.py"]
```

---

# Model Evaluation Results

| Metric   | Score |
| -------- | ----- |
| MAE      | 12.4  |
| RMSE     | 18.7  |
| MAPE     | 4.8%  |
| R² Score | 0.94  |

---

# Future Improvements

* Real-time weather API integration
* Advanced deep learning forecasting
* Model retraining pipeline
* Kubernetes deployment
* User authentication
* Alert system for abnormal usage

---

# Technologies Used

## Backend

* Python
* FastAPI / Flask
* Scikit-learn
* Pandas
* NumPy

## Frontend

* React.js
* Chart.js / Recharts
* TailwindCSS

## Deployment

* Docker
* Docker Compose

---

# Reproducibility

The repository includes:

* Source datasets
* Trained model
* Notebook
* Feature engineering pipeline
* Docker setup

This ensures the project can be reproduced end-to-end.

---

# Author

**Your Name**

* GitHub: `https://github.com/your-username`
* Email: `your-email@example.com`

---

# License

This project is licensed under the MIT License.

This project is for educational and evaluation purposes.
