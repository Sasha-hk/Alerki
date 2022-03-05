const Select = ({children, ...props}) => {
  return (
    <select 
      {...props}
      className={[props.className].join(' ')}
    >
      {children}
    </select>
  )
}


export default Select
