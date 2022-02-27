import ModalContent from '../ModalContent'
import cls from './modal-ui.module.css'


const Option = ({children, ...props}) => {
  return (
    <ModalContent
      {...props}
      className={[cls.modal_option, props.className].join(' ')}
    >
      {children}
    </ModalContent>
  )
}


export default Option
