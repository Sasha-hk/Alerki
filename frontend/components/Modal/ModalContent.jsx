import cls from './modal.module.css'


const ModalContent = ({children, ...props}) => {
  return (
    <div
      {...props}
      className={[cls.modal_paddings, props.className].join(' ')}
    >
      {children}
    </div>
  )
}


export default ModalContent
