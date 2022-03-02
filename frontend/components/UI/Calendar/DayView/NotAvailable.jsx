import cls from './days.module.css'


const NotAvailable = ({date, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.not_available, cls.day].join(' ')}
    >
      <span className={'text-' + fontSize}>{date}</span>
    </div>
  )
}


export default NotAvailable
