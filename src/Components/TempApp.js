import React, { useEffect, useState } from "react";
import "./TempApp.css";

const TempApp = () => {
  
  const [city, setCity] = useState(null);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("Renukoot");

  useEffect(() => {
    const fetchAPI = async () => {
      // const url = ` http://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&units=metric&appid=4f67c5d9301982304ae68783f274b898`

      const url = `https://api.weatherapi.com/v1/current.json?key=03910192a8984294918153205211905&q=${search.trim()}&aqi=yes`;

      const response = await fetch(url);
      // console.log(response);

      const resJSON = await response.json();
      // console.log(resJSON);
      setLocation(resJSON.location);
      setCity(resJSON.current);

    };
    fetchAPI();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">

          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

        </div>

        {!(city && location) ? (
          <p className="error_message">
            No data Found <i className="fas fa-exclamation-circle"></i>
          </p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-map-marker-alt"></i> {search},{" "}
                {location.region}
                <br />
                {location.country}
              </h2>

              <h2 className="temp">
                {city.temp_c}
                <span
                  className="iconify"
                  data-icon="mdi-temperature-celsius"
                  data-inline="false"
                />
              </h2>

              <h3 className="otherInfo"> {city.condition.text}</h3>
              <br />

              <h3 className="otherInfo">
                Latitude- {location.lat} | Longitude- {location.lon} <br />
                Humidity - {city.humidity} | Wind - {city.wind_kph} kph{" "}
              </h3>

              <br />
              <br />
              <h3 className="otherInfo">Last Updated: {city.last_updated}</h3>
            </div>

            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempApp;
