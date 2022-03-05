const handleOneNumber = (time) => {
  if (time == 0) {
    return '00'
  }
  else if (time < 10) {
    return '0' + time
  }

  return time
}

export const millisecondsToTime = (milliseconds) => {
  let hours = Math.floor(milliseconds / 60 / 60 / 1000) % 24
  let minutes = Math.floor(milliseconds / 60 / 1000) % 60

  let time = `${handleOneNumber(hours)}:${handleOneNumber(minutes)}`

  return time
}

export const timeToMilliseconds = (time) => {
  const parsed = time.split(':')

  let hours = parsed[0] * 60 * 60 * 1000
  let minutes = parsed[1] * 60 * 1000

  return hours + minutes
}
