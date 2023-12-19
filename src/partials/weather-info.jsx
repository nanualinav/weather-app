import React from 'react'
import {
    Box,
    Flex,
    Spacer,
    Text,
    Image
} from '@chakra-ui/react'

const WeatherInfo = ({ data }) => {
    const displayMorning = data.morning && data.morning.length > 0 ? data.morning[0] : null
    const displayAfternoon = data.afternoon && data.afternoon.length > 0 ? data.afternoon[0] : null
    const displayEvening = data.evening && data.evening.length > 0 ? data.evening[0] : null

    const generateRandomKey = () => {
        return Math.random().toString(36).substring(7)
    }

    return (
        <>
            {displayMorning && (
                <Flex
                    textAlign="center"
                    fontSize="lg"
                    key={generateRandomKey()}>
                    <Text
                        w="170px" h="45px"
                        my={5}
                    >Morning</Text>
                    <Spacer />
                    <Box
                        w="170px" align="center">
                        <Image
                            boxSize="75px"
                            src={`https://openweathermap.org/img/w/${displayMorning.weather[0].icon}.png`} alt="" />
                    </Box>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayMorning.weather[0].description}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {(displayMorning.main.temp - 273.15).toFixed(1)}°C
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayMorning.main.pressure}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayMorning.main.humidity}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayMorning.wind.speed}
                    </Text>
                </Flex>
            )}
            {displayAfternoon && (
                <Flex
                    textAlign="center"
                    fontSize="lg"
                    key={generateRandomKey()}>
                    <Text
                        w="170px" h="45px"
                        my={5}
                    >Afternoon</Text>
                    <Spacer />
                    <Box
                        w="170px"
                        align="center">
                        <Image
                            boxSize="75px"
                            src={`https://openweathermap.org/img/w/${displayAfternoon.weather[0].icon}.png`} alt="" />
                    </Box>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayAfternoon.weather[0].description}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {(displayAfternoon.main.temp - 273.15).toFixed(1)}°C
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayAfternoon.main.pressure}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayAfternoon.main.humidity}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayAfternoon.wind.speed}
                    </Text>
                </ Flex>
            )}
            {displayEvening && (
                <Flex
                    textAlign="center"
                    fontSize="lg"
                    key={generateRandomKey()}>
                    <Text
                        w="170px" h="45px"
                        my={5}
                    >Evening</Text>
                    <Spacer />
                    <Box
                        w="170px" align="center">
                        <Image
                            boxSize="75px"
                            src={`https://openweathermap.org/img/w/${displayEvening.weather[0].icon}.png`} alt="" />
                    </Box>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayEvening.weather[0].description}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {(displayEvening.main.temp - 273.15).toFixed(1)}°C
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayEvening.main.pressure}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayEvening.main.humidity}
                    </Text>
                    <Spacer />
                    <Text
                        w="170px" h="45px"
                        my={5}>
                        {displayEvening.wind.speed}
                    </Text>
                </Flex>
            )}
        </>
    )
}

export default WeatherInfo
