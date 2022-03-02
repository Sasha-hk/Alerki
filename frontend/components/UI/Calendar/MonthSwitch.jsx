import cls from './calendar.module.css'


const MonthSwitch = () => {
  return (
    <div className={cls.month_switch}>
      <div>
        <svg className={cls.month_switch_not_available} width="17" height="22" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.32758 17.1552L1.6724 9.50002L9.32758 1.84485" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <svg className={cls.month_switch_available} width="17" height="22" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.67242 1.84481L9.3276 9.49998L1.67242 17.1552" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}


export default MonthSwitch

