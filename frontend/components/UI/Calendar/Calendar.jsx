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


export default Calendar
