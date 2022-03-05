import cls from './days.module.css'


const Available = ({date, fontSize = 'middle', active = false, ...props}) => {
  return (
    <div
      {...props}
      className={[
        cls.available, 
        cls.day,
        active ? cls.active : null 
      ].join(' ')}
    >
      <span className={'text-' + fontSize}>{date}</span>
    </div>
  )
}


export default Available
