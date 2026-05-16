import { useEffect, useState } from "react";
import API from "./api";

function App() {

  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState({});
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const forecastRes = await API.get("/forecast");
      const weatherRes = await API.get("/weather");
      const holidayRes = await API.get("/holidays");

      setForecast(
        Array.isArray(forecastRes.data)
          ? forecastRes.data
          : [forecastRes.data]
      );

      setWeather(weatherRes.data);

      setHolidays(
        Array.isArray(holidayRes.data)
          ? holidayRes.data
          : []
      );

    } catch (error) {

      console.error("Error loading data:", error);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-lg p-6 mb-8">

          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Intelligent Power Forecast Dashboard
          </h1>

          <p className="text-gray-600 text-lg">
            Real-Time Utility Monitoring System
          </p>

        </div>

        {/* Weather Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Temperature */}

          <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <h2 className="text-2xl font-semibold mb-4">
              🌡 Temperature
            </h2>

            <div className="text-5xl font-bold">
              {weather.temperature ?? "--"}°C
            </div>

          </div>

          {/* Humidity */}

          <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <h2 className="text-2xl font-semibold mb-4">
              💧 Humidity
            </h2>

            <div className="text-5xl font-bold">
              {weather.humidity ?? "--"}%
            </div>

          </div>

          {/* Cloud Cover */}

          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <h2 className="text-2xl font-semibold mb-4">
              ☁ Cloud Cover
            </h2>

            <div className="text-5xl font-bold">
              {weather.cloud_cover ?? "--"}%
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={loadData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md font-semibold transition duration-300"
          >
            Refresh Data
          </button>

          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl shadow-md font-semibold transition duration-300"
          >
            Download Report
          </button>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md font-semibold transition duration-300"
          >
            Forecast Analytics
          </button>

        </div>

        {/* Holidays Section */}

        <div className="bg-blue-50 rounded-3xl shadow-lg p-6 mb-8 border border-blue-100">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Holidays
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse overflow-hidden rounded-xl">

              <thead>

                <tr className="bg-blue-500 text-white">

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-left">
                    Holiday Name
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  holidays.length > 0 ? (

                    holidays.map((h, index) => (

                      <tr
                        key={index}
                        className="border-b hover:bg-blue-100 transition duration-200"
                      >

                        <td className="p-4">
                          {h.date}
                        </td>

                        <td className="p-4 font-medium">
                          {h.name}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="2"
                        className="p-4 text-center text-gray-500"
                      >
                        No holiday data available
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* Forecast Section */}

        <div className="bg-blue-50 rounded-3xl shadow-lg p-6 border border-blue-100">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ⚡ Forecast Data
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse overflow-hidden rounded-xl">

              <thead>

                <tr className="bg-indigo-500 text-white">

                  <th className="p-4 text-left">
                    Time
                  </th>

                  <th className="p-4 text-left">
                    Predicted Consumption
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  forecast.length > 0 ? (

                    forecast.map((item, index) => (

                      <tr
                        key={index}
                        className="border-b hover:bg-indigo-100 transition duration-200"
                      >

                        <td className="p-4">

                          {
                            item.time
                              ? item.time
                              : `Hour ${index + 1}`
                          }

                        </td>

                        <td className="p-4 font-semibold text-indigo-700">

                          {
                            item.prediction !== undefined
                              ? item.prediction
                              : item.forecasted_power_consumption
                          }

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="2"
                        className="p-4 text-center text-gray-500"
                      >
                        No forecast data available
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;