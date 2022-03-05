import cls from './checkbox.module.css'


const Checkbox = ({children, ...props}) => {
  return (
    <div 
      {...props}
      className={[props.className, cls.wrapper].join(' ')}
    >
      {children}
    </div>
  )
}


export default Checkbox
