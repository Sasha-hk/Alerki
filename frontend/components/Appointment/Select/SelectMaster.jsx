import UserPicture from '../../UserPicture/UserPicture'
import Option from '../../Modal/UI/Option'
import MasterView from './MasterView'
import cls from './select-master.module.css'


const SelectMaster = ({master, ...props}) => {
  return (
    <Option
      {...props}
      className={[props.className].join(' ')}
    >
      <MasterView 
        master={master}
      />
    </Option>
  )
}

export default SelectMaster
