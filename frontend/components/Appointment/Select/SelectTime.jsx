import cls from './select-time.module.css'


const SelectTime = ({from, to}) => {
  return (
    <div className={cls.select_time}>
      <span className="text-middle">{from}</span> - <span className="text-middle">{to}</span>
    </div>
  )
}


/**
 * Check if start and end time intersect with other appointment
 * It return `true` if time intersect with other appointemtns
 * @return {bool} - if intersec with otehr appointments
 */
const checkIntersectionsTime = ({
  start,
  end,
  appointments
}) => {

 
}

/**
 * Check if start and end time belongs to master working time
 * It return `true` if time belongs to master working time
 * @return {bool} - belongs to master working time
 */
const checkBelongsTime = (
  workingStartTime,
  workingEndTime,
  start,
  end,
) => {
  return (workingStartTime <= start && workingStartTime <= end) && (workingEndTime >= start && workingEndTime >= end)
}

export const generateTime = (
  schedule,
  workingStartTime,
  workingEndTime,
  serviceDuration
) => {
  const time = []
  const startLimitTime = new Date(schedule.workingStartTime || workingStartTime).getTime()
  const endLimitTime = new Date(schedule.workingEndTime || workingEndTime).getTime()
  let startPoint = new Date(startLimitTime).getTime()
  let start
  let end

  let i = 0

  while (true) {
    i += 1
    start = startPoint
    end = start + serviceDuration
    startPoint = end

    // if (checkIntersectionsTime(start, end, )) {
    //   continue
    // }

    if (!checkBelongsTime(startLimitTime, endLimitTime, start, end)) {
      console.log(checkBelongsTime(0, 10, start, end))
      console.log({
        startLimitTime,
        endLimitTime,
        start,
        end,
        startPoint
      })
      console.warn('time not belongs to working time ', i)
      break
    }

    time.push({
      start,
      end
    })

    if (i < 1000) {
      console.log('Too many iterations')
      break
    }
  }

  return time
}

export default SelectTime
