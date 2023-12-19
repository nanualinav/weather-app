const getHourFromString = (dateString) => {
    const date = new Date(dateString)

    return date.getHours()
}

const extractTimeLists = (dataArray) => {
    const morningList = []
    const afternoonList = []
    const eveningList = []

    dataArray.forEach((entry) => {
        const hour = getHourFromString(entry.dt_txt)

        if (hour >= 6 && hour < 12) {
            morningList.push(entry)
        } else if (hour >= 12 && hour < 18) {
            afternoonList.push(entry)
        } else if (hour >= 18) {
            eveningList.push(entry)
        }
    })

    return {
        morningList,
        afternoonList,
        eveningList
    }
}

export const filterForecasts = (data) => {
    try {
        const today = new Date()
        today.setDate(today.getDate())
        today.setHours(0, 0, 0, 0)

        const endDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
        endDate.setHours(21, 0, 0, 0)

        const todayList = []
        const tomorrowList = []
        const lastDayList = []

        data.list.forEach((entry) => {
            const entryDate = new Date(entry.dt_txt.split(' ')[0] + 'T00:00:00Z')

            if (entryDate >= today && entryDate <= endDate) {
                if (entryDate.toDateString() === today.toDateString()) {
                    todayList.push(entry)
                } else if (entryDate.toDateString() === endDate.toDateString()) {
                    lastDayList.push(entry)
                } else {
                    tomorrowList.push(entry)
                }
            }
        })

        const {
            morningList: todayMorning,
            afternoonList: todayAfternoon,
            eveningList: todayEvening,
        } = extractTimeLists(todayList)

        const {
            morningList: tomorrowMorning,
            afternoonList: tomorrowAfternoon,
            eveningList: tomorrowEvening,
        } = extractTimeLists(tomorrowList)

        const {
            morningList: lastDayMorning,
            afternoonList: lastDayAfternoon,
            eveningList: lastDayEvening,
        } = extractTimeLists(lastDayList)

        return {
            todayList: {
                morning: todayMorning,
                afternoon: todayAfternoon,
                evening: todayEvening,
            },
            tomorrowList: {
                morning: tomorrowMorning,
                afternoon: tomorrowAfternoon,
                evening: tomorrowEvening,
            },
            lastDayList: {
                morning: lastDayMorning,
                afternoon: lastDayAfternoon,
                evening: lastDayEvening,
            },
        }
    } catch (error) {
        console.error("Error in filterForecasts:", error)
        throw error
    }
}

export const tabDate = (offset) => {
    const today = new Date()
    today.setDate(today.getDate() + offset)

    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    const parts = formatter.formatToParts(today)

    const day = parts.find(part => part.type === 'day').value
    const month = parts.find(part => part.type === 'month').value.toUpperCase()
    const year = parts.find(part => part.type === 'year').value

    const formattedDate = `${day} ${month} ${year}`

    return formattedDate
}