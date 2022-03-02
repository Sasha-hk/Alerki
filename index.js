const getDaysCount = (year, month) => {
  return 32 - new Date(year, month, 32).getDate()
}

const generateLeftOffset = (date) => {
  const offset = new Date(date.getFullYear(), date.getMonth(), 0).getDay()
  const leftOffset = []
  
  for (let i = 0; i < offset; i++) {
    leftOffset.push({
      date: new Date(date.getFullYear(), date.getMonth(), offset - i),
      type: 'another month',
    })
  }

  return leftOffset
}

const generateRightOffset = (date) => {
  const daysCount = getDaysCount(date.getFullYear(), date.getMonth())
  const offset = new Date(date.getFullYear(), date.getMonth(), daysCount).getDay()
  const rightOffset = []

  for (let i = 1; i < offset; i++) {
    rightOffset.push({
      date: new Date(date.getFullYear(), date.getMonth(), daysCount + i + 1),
      type: 'another month',
    })
  }

  return rightOffset
}

const date = new Date()
const calendarDays = []
const daysCount = getDaysCount(date.getFullYear(), date.getMonth())

calendarDays.push(...generateLeftOffset(date))
let dateNode = date

for (let i = 1; i < daysCount + 1; i++) {
  dateNode.setDate(i)
  calendarDays.push({
    date: new Date(dateNode),
    type: 'available'
  })
}

calendarDays.push(...generateRightOffset(date))
