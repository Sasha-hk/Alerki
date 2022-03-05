import { cloneElement } from 'react'
import cls from './error-view.module.css'


const ErrorHandler = ({children, error, ...props}) => {
  // if is error then add error class to children
  if (error) {
    var updatedElement = cloneElement(children, {
      className: [children.props.className, 'error'].join(' ')
    })
  }

  return (
    <div
     {...props}
    >
      <div>
        {updatedElement || children}
      </div>

      {
        error
          ? <span className={cls.error_view}>{error}</span>
          : null
      }
    </div>
  )
}


export default ErrorHandler
