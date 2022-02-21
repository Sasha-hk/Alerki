import cls from '../../../styles/pages/home/base.module.css'


const HomeWrapper = ({children, ...props}) => {
  return (
    <div
      {...props}
      className={['container', cls.window, props.className].join(' ')}
    >
      {children}
    </div>
  )
}


export default HomeWrapper
