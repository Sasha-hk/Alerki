import { cloneElement } from 'react'
import cls from './radio-button.module.css'


const RadioButton = ({children, ...props}) => {
  return (
    <div 
      {...props}
      className={[props.className, cls.wrapper].join(' ')}
    >
      {children}
    </div>
  )
}


export default RadioButton
