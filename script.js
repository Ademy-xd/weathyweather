const apiKey = '0588c58c78d3f3b99489e0abf4b5aeeb';

document.getElementById('search').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getWeather(e.target.value);
  }
});

function getWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `${data.main.temp}°C`;
      document.getElementById('description').textContent = data.weather[0].description;
      document.getElementById('windSpeed').textContent = `Wind: ${data.wind.speed} m/s`;
      document.getElementById('windDirection').textContent = `Direction: ${data.wind.deg}°`;
      document.getElementById('sunrise').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
      document.getElementById('sunset').textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
      document.getElementById('dateTime').textContent = new Date().toLocaleString();

      document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });

  fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecastCards');
      forecastContainer.innerHTML = '';

      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const card = document.createElement('div');
        card.classList.add('weather-card');
        card.style.background = 'linear-gradient(to right, #30cfd0, #330867)';
        card.innerHTML = `
          <p>${new Date(forecast.dt * 1000).toDateString()}</p>
          <p>${forecast.main.temp}°C</p>
          <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        `;
        forecastContainer.appendChild(card);
      }
    });
}




  
  
  
  