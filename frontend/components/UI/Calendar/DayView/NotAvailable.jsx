import cls from './days.module.css'


const NotAvailable = ({number, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.not_available, cls.day].join(' ')}
    >
      <span className={'text-' + fontSize}>1</span>
    </div>
  )
}


export default NotAvailable
