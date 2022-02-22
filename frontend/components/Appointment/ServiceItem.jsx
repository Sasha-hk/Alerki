import cls from './service-item.module.css'


const ServiceItem = ({children, ...props}) => {
  return (
    <option
      {...props}
      className={[cls.service_item, props.className].join(' ')}
    >
      {children}
    </option>
  )
}


export default ServiceItem
