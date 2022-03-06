import cls from './days.module.css'


const AnotherMonth = ({number, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.another_month, cls.day].join(' ')}
    >
      
    </div>
  )
}


export default AnotherMonth
