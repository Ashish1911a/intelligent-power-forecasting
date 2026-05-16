from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from datetime import datetime, timedelta
from weather_service import get_weather
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

@app.get("/")
def home():
    return {"message": "Forecast API Running"}

@app.get("/weather")
def weather():
    return get_weather("Dhanbad,IN")

@app.get("/holidays")
def holidays():

    with open("holidays.json") as f:
        data = json.load(f)

    return data

@app.get("/forecast")
def forecast():

    forecast_data = []

    current = datetime.now()

    for i in range(96):

        row = [
            current.hour,
            current.day,
            current.month,
            current.weekday(),
            120,
            118
        ]

        scaled = scaler.transform([row])

        pred = model.predict(scaled)[0]

        forecast_data.append({
            "time": current.strftime("%H:%M"),
            "prediction": round(float(pred), 2)
        })

        current += timedelta(minutes=15)

    return forecast_data