import {
  generateLeftOffset,
  generateRightOffset,
  getDaysCount
} from './utils/date'
import { days } from './data'
import cls from './calendar.module.css'


const Calendar = ({children, ...props}) => {
  return (
    <div
      {...props}
      className={[cls.calendar, props.className].join(' ')}
    >
      {children}  
    </div>
  )
}

export const generateDays = (date) => {
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

  return calendarDays
}

export const setWeekendDays = (calendar, weekendDays) => {
  const out = []
  console.log(calendar) 
  for (let i in calendar) {
    console.log(calendar[i].date.getDay())
    if (calendar[i].type == 'available') {
      if (weekendDays[days[calendar[i].date.getDay()]]) {
        if (weekendDays[days[calendar[i].date.getDay()]]) {
          console.log(weekendDays[days[calendar[i].date.getDay()]])
          out.push({
            ...calendar[i],
            type: 'not available',
          })
        }
        else {
          out.push(calendar[i])
        }
      }
      else {
        out.push(calendar[i])
      }
    }
  }

  return out
}

export default Calendar
