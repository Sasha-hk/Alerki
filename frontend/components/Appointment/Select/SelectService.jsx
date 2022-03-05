import Option from '../../Modal/UI/Option'
import cls from './select-service.module.css'


const SelectService = ({children, ...props}) => {
  return (
    <Option
      {...props}
      className={[cls.service_item, props.className].join(' ')}
    >
      {children}
    </Option>
  )
}


export default SelectService
