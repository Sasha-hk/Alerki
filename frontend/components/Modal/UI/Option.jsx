import ModalContent from '../ModalContent'
import cls from './modal-ui.module.css'


const Option = ({children, active = false, ...props}) => {
  return (
    <ModalContent
      {...props}
      className={[
        cls.modal_option, 
        props.className,
        active
          ? cls.option_active
          : null
      ].join(' ')}
    >
      {children}
    </ModalContent>
  )
}


export default Option
