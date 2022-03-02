import cls from './days.module.css'


const NotAvailable = ({number, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.not_available, cls.day].join(' ')}
    >
    </div>
  )
}


export default NotAvailable
