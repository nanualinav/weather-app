import React from "react";
import { 
    Box,
    Text,
    Image,
    Tabs,
    TabList,
    Tab
  } from '@chakra-ui/react'

  const WeatherBox = ({ title, currentData, selectedTab, setSelectedTab, isThirdDay }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }

    const handleTabChange = (index) => {
        const timeOfDay = index === 0 ? 'morning' : (index === 1 ? 'afternoon' : 'evening')
        if (isThirdDay) {
            setSelectedTab(prev => ({ ...prev, thirdDay: timeOfDay }))
        } else {
            setSelectedTab(prev => ({ ...prev, [title.toLowerCase().replace(/\s/g, '')]: timeOfDay }))
        }
    }

    return (
        <Box
            border=".5px solid white" 
            borderRadius="3rem"
            w={{ base: '100%', md: '30%' }}
            bg="rgba(255, 255, 255, .3)"
            p={4}
            position="relative"
            display="flex"
            flexDirection="column"
            align="left"
            minWidth="24rem"
        >
            <Box p={4} flex="1">
                <Text fontSize="2xl" fontWeight="bold" color="pink.200">
                    {title}
                </Text>
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    p={2}
                >
                    <Image
                        boxSize="100px"
                        src={`https://openweathermap.org/img/w/${currentData?.weather?.[0]?.icon || '01d'}.png`}
                        alt="Weather Icon"
                    />
                </Box>
                <Text fontSize="6xl" fontWeight="700" color="white">
                    {(currentData?.main?.temp - 273.15).toFixed(0)}°C
                </Text>
                <Text fontSize="4xl" lineHeight={1.1} pb="1rem" fontWeight="bold" color="white">
                    {capitalizeFirstLetter(currentData?.weather?.[0]?.description || 'No data available')}
                </Text>
                <Text fontSize="md" color="white">
                    <span>Pressure:</span> {currentData?.main?.pressure} hPa
                </Text>
                <Text fontSize="md" color="white">
                    <span>Humidity:</span> {currentData?.main?.humidity}%
                </Text>
                <Text fontSize="md" color="white">
                    <span>Wind Speed:</span> {currentData?.wind?.speed} m/s
                </Text>
            </Box>
            <Box width="100%" mt={4}>
                <Tabs
                    colorScheme="teal"
                    textAlign="center"
                    onChange={handleTabChange}
                    isFitted
                    variant="soft-rounded"
                >
                    <TabList pb="1rem">
                        <Tab color="white">Morning</Tab>
                        <Tab color="white">Afternoon</Tab>
                        <Tab color="white">Evening</Tab>
                    </TabList>
                </Tabs>
            </Box>
        </Box>
    )
  }

  export default WeatherBox