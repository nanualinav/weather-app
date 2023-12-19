const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5'

export const fetchCurrentWeather = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        )
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`)
    }
}

export const fetchWeather = async (location) => {
    try {
        const response = await fetch(`${baseUrl}/forecast?q=${location}&appid=${API_KEY}`)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`)
    }
}