import pandas as pd
import numpy as np
import joblib

from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler

from preprocess import clean_data

df = clean_data()

# Convert datetime column
df["Datetime"] = pd.to_datetime(
    df["Datetime"],
    errors="coerce"
)

# Remove invalid datetime rows
df.dropna(subset=["Datetime"], inplace=True)

# Time features
df["hour"] = df["Datetime"].dt.hour
df["day"] = df["Datetime"].dt.day
df["month"] = df["Datetime"].dt.month
df["weekday"] = df["Datetime"].dt.weekday

# Target column
target_col = "F1_132KV_PowerConsumption"

# Lag feature
df["lag_1"] = df[target_col].shift(1)

# Rolling mean
df["rolling_mean"] = df[target_col].rolling(3).mean()

df.dropna(inplace=True)

features = [
    "hour",
    "day",
    "month",
    "weekday",
    "lag_1",
    "rolling_mean"
]

X = df[features]
y = df[target_col]

# Scaling
scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=6
)

model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, predictions)

print("MAE:", mae)

# Save model
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("Model saved")