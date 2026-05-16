Intelligent Power Demand Forecasting (APU)

A full-stack machine learning system that forecasts electricity demand in 10-minute intervals (144 blocks/day) using historical load data, weather API integration, and localized holiday intelligence for Dhanbad, Jharkhand.

🚀 Project Overview

This system is an end-to-end pipeline that:

Cleans and analyzes real-world power consumption data
Integrates live weather data (temperature, humidity, cloud cover, wind speed)
Incorporates localized holiday effects
Engineers time-series features (lags, rolling averages)
Trains an ML model for demand forecasting
Serves predictions via FastAPI backend
Displays results in a React dashboard
Runs fully inside Docker
🧠 Problem Statement

Electricity demand is highly volatile due to:

Weather conditions
Time of day
Local holidays and industrial shutdowns
Historical consumption patterns

This project predicts future power demand every 10 minutes for 24 hours (144 predictions).

🏗️ Tech Stack
Backend
FastAPI
Python
XGBoost / Scikit-learn
Pandas, NumPy
Joblib
Frontend
React (Vite)
Axios
Recharts / Chart.js
Data Sources
Utility Consumption Dataset (CSV)
OpenWeatherMap API
Custom Holiday Dataset (Dhanbad, Jharkhand)
GHG Emissions Dataset (optional feature enrichment)
Deployment
Docker
Uvicorn
📁 Project Structure
intelligent-power-forecasting/
│
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── preprocess.py
│   ├── weather_service.py
│   ├── holidays.json
│   ├── Utility_consumption.csv
│   ├── GHG.xlsx
│   ├── model.pkl
│   ├── scaler.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
│
├── notebooks/
│   └── EDA_and_Model_Training.ipynb
│
├── Dockerfile
├── docker-compose.yml
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/intelligent-power-forecasting.git
cd intelligent-power-forecasting
2️⃣ Create Virtual Environment
python -m venv venv
Activate:

Windows:

venv\Scripts\activate

Mac/Linux:

source venv/bin/activate
3️⃣ Install Backend Dependencies
pip install -r backend/requirements.txt
4️⃣ Install Frontend Dependencies
cd frontend
npm install
🌦️ Weather API Setup

This project uses OpenWeatherMap API.

Step 1:

Create account:
https://openweathermap.org/api

Step 2:

Get API Key and update:

backend/weather_service.py
API_KEY = "YOUR_API_KEY"
🧪 Model Training

Run training script:

cd backend
python train_model.py

This will:

Clean data
Generate features
Train XGBoost model
Save:
model.pkl
scaler.pkl
🚀 Run Backend (FastAPI)
cd backend
uvicorn app:app --reload
API runs at:
http://127.0.0.1:8000
Swagger Docs:
http://127.0.0.1:8000/docs
📡 API Endpoints
🔹 Health Check
GET /
🔹 Forecast (24 Hours / 96 Blocks)
GET /forecast

Returns:

[
  {
    "time": "10:00",
    "prediction": 125.67
  }
]
🔹 Weather Data
GET /weather

Returns:

{
  "temperature": 32,
  "humidity": 65,
  "cloud_cover": 40,
  "wind_speed": 3.2
}
🔹 Holiday Data
GET /holidays
📊 Features Used in Model
Time Features
Hour
Day
Month
Weekday
Lag Features
lag_1 (previous demand)
rolling_mean (3-step window)
External Features
Temperature
Humidity
Cloud Cover
Wind Speed
Holiday Flag
Bonus Feature
GHG Emission Index
📈 Model Details

Algorithm:

XGBoost Regressor

Why:

Handles non-linear time series
Works well with tabular data
Robust to missing values

Evaluation:

MAE (Mean Absolute Error)
RMSE (optional)
💻 Run Frontend
cd frontend
npm run dev

Frontend runs at:

http://localhost:5173
📊 Dashboard Features
Forecast line chart (144 blocks/day)
Weather panel (temp, humidity, wind)
Holiday indicators
GHG impact summary (optional)
Clean responsive UI
🐳 Docker Setup
Build Image
docker build -t power-forecast .
Run Container
docker run -p 8000:8000 power-forecast
OR USE DOCKER COMPOSE
docker-compose up --build
📦 Deployment Options
Backend
Render
AWS EC2
Azure App Service
Frontend
Vercel
Netlify
📌 Key Highlights (What Makes This Project Strong)

✔ Real-time weather integration
✔ Localized holiday intelligence (Dhanbad-specific)
✔ Time-series feature engineering
✔ XGBoost forecasting model
✔ Full-stack implementation
✔ Dockerized deployment
✔ Scalable API design

🧠 Future Improvements
LSTM / Transformer-based forecasting
Kafka streaming for real-time updates
Database integration (PostgreSQL)
Multi-region forecasting
CI/CD pipeline (GitHub Actions)
👨‍💻 Author

Built for Data Developer Internship Assignment
Exascale Deeptech & AI Pvt. Ltd.

📜 License

This project is for educational and evaluation purposes.
