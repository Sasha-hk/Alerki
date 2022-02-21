import cls from './service-item.module.css'


const ServiceItem = ({children, ...props}) => {
  return (
    <li
      {...props}
      className={[cls.service_item, props.className].join(' ')}
    >
      {children}
    </li>
  )
}


export default ServiceItem
