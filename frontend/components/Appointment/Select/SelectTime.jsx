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
const checkBelongsTime = ({
  workingStartTime,
  workingEndTime,
  start,
  end,
}) => {

}

export const generateTime = ({
  schedule,
  workingStartTime,
  workingEndTime,
  serviceDuration
}) => {
  const time = []
  const startLimitTime = new Date(schedule.workingStartTime || workingStartTime).getTime()
  const endLimitTime = new Date(schedule.workingEndTime || workingEndTime).getTime
  let startPoint = new Date(startLimitTime).getTime()
  let start
  let end

  while (true) {
    start = startPoint
    end = start + serviceDuration

    if (checkIntersectionsTime) {
      continue
    }

    if (!checkBelongsTime) {
      break
    }

    time.apend()


  }
}


export default SelectTime
