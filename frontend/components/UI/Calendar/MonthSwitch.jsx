import cls from './calendar.module.css'


const MonthSwitch = ({date, previous, next}) => {
  const condition = new Date().getTime() < new Date(date).getTime()

  return (
    <div className={cls.month_switch}>
      <div
        onClick={() => {
          if (condition) {
            previous()
          }
        }}
      >
        <svg 
          className={
            condition
              ? cls.month_switch_available
              : cls.month_switch_not_available
          } 
          width="17" 
          height="22" 
          viewBox="0 0 11 19" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9.32758 17.1552L1.6724 9.50002L9.32758 1.84485" 
          />
        </svg>
      </div>

      <div
        onClick={() => {
          next()
        }}
      >
        <svg
          className={cls.month_switch_available} 
          width="17" 
          height="22" 
          viewBox="0 0 11 19" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.67242 1.84481L9.3276 9.49998L1.67242 17.1552" 
          />
        </svg>
      </div>
    </div>
  )
}


export default MonthSwitch
