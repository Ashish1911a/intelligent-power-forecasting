import pandas as pd
import numpy as np

def clean_data():

    df = pd.read_csv("Utility_consumption.csv")

    # remove duplicates
    df.drop_duplicates(inplace=True)

    # fill missing values
    df.ffill(inplace=True)

    # power consumption columns
    power_cols = [
        "F1_132KV_PowerConsumption",
        "F2_132KV_PowerConsumption",
        "F3_132KV_PowerConsumption"
    ]

    # outlier handling using IQR
    for col in power_cols:

        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)

        iqr = q3 - q1

        lower = q1 - 1.5 * iqr
        upper = q3 + 1.5 * iqr

        df[col] = np.clip(df[col], lower, upper)

    return df