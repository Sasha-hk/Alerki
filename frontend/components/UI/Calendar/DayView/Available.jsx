import cls from './days.module.css'


const Available = ({date, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.available, cls.day].join(' ')}
    >
      <span className={'text-' + fontSize}>{date}</span>
    </div>
  )
}


export default Available
