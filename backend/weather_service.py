import requests

API_KEY = "your_openweather_api_key"

def get_weather(city="Dhanbad,IN"):

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={"15ebea20954acedb9d479982b5c67f5b"}&units=metric"

    response = requests.get(url)
    data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "cloud_cover": data["clouds"]["all"],
        "wind_speed": data["wind"]["speed"]
    }


def weather():
    return get_weather("Dhanbad,IN")