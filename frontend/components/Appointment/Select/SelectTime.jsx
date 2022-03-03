import cls from './select-time.module.css'


const SelectTime = ({from, to}) => {
  return (
    <div className={cls.select_time}>
      <span className="text-middle">{from}</span> - <span className="text-middle">{to}</span>
    </div>
  )
}


export default SelectTime
