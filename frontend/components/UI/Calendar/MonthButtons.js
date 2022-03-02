const nextMonth = () => {
  const date = calendarDate().date.setMonth()
  date.setMonth(date.getMonth() + 1)

  setCalendarData({
    date,
    year: date.getFullYear(),
    month: date.getMonth(),
  })
}

const previousMonth = () => {
  const date = calendarDate().date.setMonth()
  date.setMonth(date.getMonth() - 1)

  setCalendarData({
    date,
    year: date.getFullYear(),
    month: date.getMonth(),
  })
}