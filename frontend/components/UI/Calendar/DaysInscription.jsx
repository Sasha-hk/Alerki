import cls from './calendar.module.css'


const DaysInscription = () => {
  const dayNames = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ]

  return (
    <div className={cls.days_inscription}>
      {
        dayNames.map(day => (
          <span
            key={day}
          >
            {day}
          </span>
        ))
      }
    </div>
  )
}


export default DaysInscription
