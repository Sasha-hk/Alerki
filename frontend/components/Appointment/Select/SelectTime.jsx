import {millisecondsToTime} from '../../../utils/timeConvert.js'
import cls from './select-time.module.css'


const SelectTime = ({from, to, active = false, ...props}) => {
  return (
    <div {...props} className={[
      cls.select_time, 
      'text-middle',
      active
        ? cls.active
        : null,
    ].join(' ')}>
      {from} - {to}
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
      break
    }

    time.push({
      start,
      end
    })

    if (i == 100) {
      break
    }
  }

  return time
}

export default SelectTime
