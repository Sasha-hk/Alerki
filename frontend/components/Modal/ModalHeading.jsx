import cls from './modal.module.css'


const ModalHeading = ({
  children, 
  value,
  setValue,
  ...props
}) => {
  return (
    <div
      {...props}
      className={[cls.modal_heading, props.className].join(' ')}
    >
      {children}
    </div>
  )
}


export default ModalHeading
