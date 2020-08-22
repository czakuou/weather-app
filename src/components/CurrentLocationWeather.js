import React, { useState, useEffect } from 'react';
import styles from './styles/index.css'

function CurrentLocationWeather() {
    const [apiLink, setApiLink] = useState()
    const [currentLocationData, setCurrentLocationData] = useState()
    const link ='https://api.openweathermap.org/data/2.5/weather?lat=52.22&lon=21.01&appid=5d2f9de40d51686b5f3b1ad3e79871bf&lang=pl&units=metric'
    let temp = 0
    let temp_min = 0
    let temp_max = 0
    let weatherImg = ''
    let currentWeather = {
        temp: 'Location Temperature Loading',
      }


    
      //connect to API using users geolocation
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      setApiLink(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed(2)}&lon=${position.coords.longitude.toFixed(2)}&appid=5d2f9de40d51686b5f3b1ad3e79871bf&lang=pl&units=metric`)
    })
    fetch(apiLink)
      .then(res => res.json())
      .then(data =>{
        setCurrentLocationData(Object.assign([], data))
      })
      .catch(error => {
        setApiLink('https://api.openweathermap.org/data/2.5/weather?lat=52.22&lon=21.01&appid=5d2f9de40d51686b5f3b1ad3e79871bf&lang=pl&units=metric')
      })
  }, [apiLink])


    // Asign data after connecting to API
    if(currentLocationData !== undefined) {
        currentWeather = {
          temp: currentLocationData.main.temp,
          description: currentLocationData.weather[0].description,
          temp_min: currentLocationData.main.temp_min,
          temp_max: currentLocationData.main.temp_max,
          feels_like: currentLocationData.main.feels_like,
          id: currentLocationData.weather[0].id,
          name: currentLocationData.name
        }
        temp = currentWeather.temp
        temp_min = currentWeather.temp_min
        temp_max = currentWeather.temp_max
        getWeatherIcon()
        }

        //download weather icons depends on users location
    function getWeatherIcon() {
        if(currentWeather.id >= 200 && currentWeather.id <300) weatherImg = 'https://openweathermap.org/img/wn/11d@2x.png'
        else if(currentWeather.id >= 300 && currentWeather.id <400) weatherImg = 'https://openweathermap.org/img/wn/09d@2x.png'
        else if(currentWeather.id === 511) weatherImg = 'https://openweathermap.org/img/wn/13d@2x.png'
        else if(currentWeather.id >= 500 && currentWeather.id <600) weatherImg = 'https://openweathermap.org/img/wn/10d@2x.png'
        else if(currentWeather.id >= 600 && currentWeather.id <700) weatherImg = 'https://openweathermap.org/img/wn/13d@2x.png'
        else if(currentWeather.id >= 700 && currentWeather.id <800) weatherImg = 'https://openweathermap.org/img/wn/50d@2x.png'
        else if(currentWeather.id === 800) weatherImg = 'https://openweathermap.org/img/wn/01d@2x.png'
        else if(currentWeather.id > 800 && currentWeather.id <900) weatherImg = 'https://openweathermap.org/img/wn/02d@2x.png'
    }

    //get current day of the week
    function getDay() {
      const date = new Date()
      const today = date.getDay()
      const weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
      return weekDays[today]
    }



    return (
        <div className='currentLocationWeather-box'>
            <img src={weatherImg} alt="weather photo" />
            <div className='currentLocationWeather-box__container'>
              <div className='currentLocationWeather-box__container-location'>
                <h1>{getDay()}</h1>
                <h2>{currentWeather.name}</h2>
              </div>
              <div className='currentLocationWeather-box__container-temp'>
                <p className='weatherTemp'>{temp.toFixed(0)}°C</p>
                <p>{currentWeather.description}</p>
                <p>Min:{temp_min.toFixed(0)}°C Max: {temp_max.toFixed(0)}°C</p>
              </div>
            </div>
        </div>
    )
}

export default CurrentLocationWeather