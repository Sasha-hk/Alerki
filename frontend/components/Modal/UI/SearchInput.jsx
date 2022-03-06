import Input from '../../UI/Input/Input'
import cls from './modal-ui.module.css'


const SearchInput = ({...props}) => {
  return (
    <Input 
      {...props}
      className={[cls.search_heading_input, props.className].join(' ')}
    />
  )
}


export default SearchInput
