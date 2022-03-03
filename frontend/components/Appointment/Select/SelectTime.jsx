import cls from './select-master.module.css'


const SelectTime = ({from, to}) => {
  return (
    <div className={cls.select_time}>
      <span>{from}</span>
      -
      <span>{to}</span>
    </div>
  )
}


export default SelectTime
