import React, { useState, useEffect } from 'react'
import { 
  ChakraProvider,
  Box,
  Container,
  Text,
  Button,
  Input,
  HStack,
  VStack,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { filterForecasts, tabDate } from './partials/date-formatter'
import { fetchCurrentWeather, fetchWeather } from './network/request-handler'
import WeatherBox from './partials/weather-box';

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [todayData, setTodayData] = useState(null)
    const [tomorrowData, setTomorrowData] = useState(null)
    const [thirdDayData, setThirdDayData] = useState(null)
    const [location, setLocation] = useState('')
    const [error, setError] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    
    const [selectedTab, setSelectedTab] = useState({
        today: 'morning',
        tomorrow: 'morning',
        thirdDay: 'morning'
    })

    const fetchCurrentLocationWeather = async () => {
        try {
            setShowLoading(true)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    try {
                        const { latitude, longitude } = position.coords
                        const data = await fetchCurrentWeather(latitude, longitude)
                        const { todayList, tomorrowList, lastDayList } = filterForecasts(data)

                        setWeatherData(data)
                        setTodayData(todayList)
                        setTomorrowData(tomorrowList)
                        setThirdDayData(lastDayList)
                        setShowLoading(false)

                    } catch (error) {
                        setError('An error occurred while processing weather data.')
                        setShowLoading(false)
                    }
                })
            } else {
                setError('Geolocation is not supported by your browser.')
                setShowLoading(false)
            }
        } catch (error) {
            setError('An error occurred while fetching location.')
            setShowLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentLocationWeather()
    }, [])

    const handleSearch = async () => {
        setError('')

        if (!/^[a-zA-Z\s]+$/.test(location)) {
            setError('Please enter a valid location')
            return
        }
        try {
            setShowLoading(true)
            const data = await fetchWeather(location)
            const { todayList, tomorrowList, lastDayList } = filterForecasts(data)

            setWeatherData(data)
            setTodayData(todayList)
            setTomorrowData(tomorrowList)
            setThirdDayData(lastDayList)
            setShowLoading(false)
            setError('')

        } catch (error) {
            console.error('Error fetching weather data:', error)

            if (error.message.includes('404')) {
                setError('Location not found. Please enter a valid location.')
                setShowLoading(false)
            } else {
                setError('An error occurred while fetching weather data.')
                setShowLoading(false)
            }
        } finally {
            setShowLoading(false)
        }
    }

    const getCurrentData = (data, timeOfDay) => {
        const dataSet = {
            morning: data?.morning?.[0],
            afternoon: data?.afternoon?.[0],
            evening: data?.evening?.[0]
        }
        return dataSet[timeOfDay] || dataSet.afternoon || dataSet.evening
    }

    const currentData = {
        today: getCurrentData(todayData, selectedTab.today),
        tomorrow: getCurrentData(tomorrowData, selectedTab.tomorrow),
        thirdDay: getCurrentData(thirdDayData, selectedTab.thirdDay)
    }
    
    return (
        <ChakraProvider>
            <Box 
                w="100vw"
                minHeight="100vh"
                backgroundColor="#152238"
                display="flex"
                alignItems="top"
            >
                <Container
                    align="left"
                    maxWidth="100%"
                >
                    <VStack maxW="2xl" align="left" p="3rem">
                    <HStack  spacing={5} mb="1rem">
                        <Input
                            variant="flushed"
                            focusBorderColor="#00ffd9"
                            placeholder="City to find..."
                            color="white"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                        <Button
                            backgroundColor="white"
                            color="#152238"
                            size="sm"
                            boxShadow='lg'
                            onClick={handleSearch}
                        >SEARCH
                        </Button>
                    </HStack>
                    {showLoading && (
                        <Box
                            width="100%"
                            zIndex="999"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Spinner size="xl" color="pink.200" />
                        </Box>
                    )}
                        {error && <Text color="red.200" fontSize="sm">{String(error)}</Text>}
                    </VStack>
                    <Text fontWeight="bold" fontSize="4xl" pl="3rem" pt="2rem" color="white">
                        {weatherData?.city?.name && `Weather in ${weatherData.city.name}`}
                    </Text>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        spacing={{ base: 5, md: 0 }}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        justify="flex-start"
                        p="3rem"
                        gap={5}
                    >
                        {todayData && (
                            <Box mb={{ base: 4, md: 0 }} flex="1">
                                <WeatherBox
                                    title = "Today"
                                    currentData={currentData.today}
                                    selectedTab={selectedTab}
                                    setSelectedTab={setSelectedTab}
                                />
                            </Box>
                           
                        )}
                        {tomorrowData && (
                            <Box mb={{ base: 4, md: 0 }} flex="1">
                                <WeatherBox
                                    title="Tomorrow"
                                    currentData={currentData.tomorrow}
                                    data={tomorrowData}
                                    selectedTab={selectedTab}
                                    setSelectedTab={setSelectedTab}
                                />
                            </Box>
                        )}
                        {thirdDayData && (
                            <Box mb={{ base: 4, md: 0 }} flex="1">
                                < WeatherBox
                                    title={tabDate(2)}  
                                    currentData={currentData.thirdDay}
                                    data={thirdDayData}
                                    setSelectedTab={setSelectedTab}
                                    isThirdDay
                                />
                            </Box>
                        )}
                    </Flex>
                </Container>
            </Box>
        </ChakraProvider>
    )
}

export default App
