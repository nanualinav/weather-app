import React, { useState, useEffect } from 'react'
import WeatherInfo from './partials/weather-info'
import { filterForecasts, tabDate } from './partials/date-formatter'
import { fetchCurrentWeather, fetchWeather } from './network/request-handler'
import { 
  ChakraProvider,
  Box,
  Container,
  Text,
  Button,
  Input,
  HStack,
  Heading,
  Flex,
  Spacer,
  Tabs,
  TabList,
  Tab, 
  TabPanels, 
  TabPanel,
  Spinner
} from '@chakra-ui/react'

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [todayData, setTodayData] = useState(null)
    const [tomorrowData, setTomorrowData] = useState(null)
    const [thirdDayData, setThirdDayData] = useState(null)
    const [location, setLocation] = useState('')
    const [error, setError] = useState('')
    const [showLoading, setShowLoading] = useState(false)

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
        console.log('Searching for:', location)
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

            setShowLoading(false)
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

  return (
    <ChakraProvider>
      <Container
            align="center"
            mt="60px"
            maxWidth="80%">
            {showLoading && (
            <Box
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="100vh"
              backgroundColor="rgba(255, 255, 255, 0.8)"
              zIndex="999"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="xl" color="purple.500" />
            </Box>
          )}
            <HStack maxW="xl" spacing={5}>
                <Input
                    variant="flushed"
                    focusBorderColor="purple.400"
                    placeholder="City to find..."
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                />
                <Button
                    colorScheme="purple"
                    size="lg"
                    boxShadow='md'
                    onClick={handleSearch}
                >SEARCH
                </Button>
            </HStack>
            {error && <Text color="red" fontSize="sm">{String(error)}</Text>}
            <Heading as="h3" mt="60px">
                {weatherData?.city?.name && `Weather in ${weatherData.city.name}`}
            </Heading>
            <Box mt="40px" border="1px solid purple">
                <Tabs isLazy isFitted variant="unstyled">
                    <TabList
                        h="60px" color="gray.200"
                        bg="purple.400">
                        <Tab
                            _selected={{ borderBottom: "4px solid yellow", color: "white" }}
                        >{tabDate(0)}
                        </Tab>
                        <Tab
                            _selected={{ borderBottom: "4px solid yellow", color: "white" }}
                        >{tabDate(1)}
                        </Tab>
                        <Tab
                            _selected={{ borderBottom: "4px solid yellow", color: "white" }}
                        >{tabDate(2)}
                        </Tab>
                    </TabList>
                    <Flex fontSize="lg" fontWeight="bold" textAlign="center">
                        <Text
                            w="170px" h="45px">Time</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Weather</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Description</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Temperature</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Atm.pressure, mmHg</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Humidity air, %</Text>
                        <Spacer />
                        <Text
                            w="170px" h="45px">Win, m/s</Text>
                    </Flex>
                    <TabPanels>
                        {todayData && (
                            <TabPanel>
                                <WeatherInfo
                                    data={todayData}>
                                </WeatherInfo>
                            </TabPanel>
                        )}
                        {tomorrowData && (
                            <TabPanel>
                                <WeatherInfo
                                    data={tomorrowData}>
                                </WeatherInfo>
                            </TabPanel>
                        )}
                        {thirdDayData && (
                            <TabPanel>
                                <WeatherInfo
                                    data={thirdDayData}>
                                </WeatherInfo>
                            </TabPanel>
                        )}
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    </ChakraProvider>  
  )
}

export default App;
