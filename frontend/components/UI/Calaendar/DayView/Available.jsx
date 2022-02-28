import cls from './days.module.css'


const Available = ({number, ...props}) => {
  return (
    <div
      {...props}
      className={[cls.available, cls.day].join(' ')}
    >
      {/* {number} */}
      1
    </div>
  )
}


export default Available
