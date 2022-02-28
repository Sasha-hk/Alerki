import cls from './days.module.css'


const Available = ({number, fontSize = 'middle', ...props}) => {
  return (
    <div
      {...props}
      className={[cls.available, cls.day].join(' ')}
    >
      <span className={'text-' + fontSize}>1</span>
    </div>
  )
}


export default Available
