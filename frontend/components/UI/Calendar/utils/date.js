export const getDaysCount = (year, month) => {
  return 32 - new Date(year, month, 32).getDate()
}

export const generateLeftOffset = (date) => {
  const offset = new Date(date.getFullYear(), date.getMonth(), 0).getDay()
  const leftOffset = []
  
  for (let i = 0; i < offset; i++) {
    leftOffset.push({
      date: new Date(date.getFullYear(), date.getMonth(), offset - i - 1),
      type: 'another month',
    })
  }

  return leftOffset
}

export const generateRightOffset = (date) => {
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