const APIKEY = 'fa731fa0a1992dd874c51bdc073b0a99';

const getLatLon = () => {
    let lat = document.getElementById('lat').value
    let lon = document.getElementById('lon').value
    if(isNaN(lat) || isNaN(lon) || !lat || !lon) {
        alert('Write a lat and lon')
    } else {
       return getWeatherData(lat , lon)
    }
}
async function getWeatherData(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    try {
      const response = await axios.get(URL);
      return generateCard(response.data)
    } catch (error) {
      throw new Error('Failed to fetch weather data from OpenWeatherMap API');
    }
  }

const generateCard = (cardData) => {
    const cityWrapper = document.querySelector('.city-wheather__wrapper');
    const formatedTemp = (cardData.main.temp - 273).toFixed();
    cityWrapper.innerHTML = `
    <div id="weather_wrapper">
      <div class="weatherCard">
          <div class="currentTemp">
          <span class="temp">${formatedTemp}&deg;</span>
          <span class="location">${cardData.name}</span>
          </div>
          <div class="currentWeather">
          <span class="conditions">${cardData.weather[0].main}</span>
          <div class="info">
              <span class="rain">${cardData.main.humidity} %</span>
              <span class="wind">${cardData.wind.speed} MPH</span>
          </div>
          </div>
      </div>
      </div>`;
}