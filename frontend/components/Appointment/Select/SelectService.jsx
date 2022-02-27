import ModalContent from '../../Modal/ModalContent'
import cls from './service-item.module.css'


const SelectService = ({children, ...props}) => {
  return (
    <ModalContent
      {...props}
      className={[cls.service_item, props.className].join(' ')}
    >
      {children}
    </ModalContent>
  )
}


export default SelectService
