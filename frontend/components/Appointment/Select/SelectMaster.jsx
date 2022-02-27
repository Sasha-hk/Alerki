import UserPicture from '../../UserPicture/UserPicture'
import Option from '../../Modal/UI/Option'
import cls from './select-master.module.css'


const SelectMaster = ({master, ...props}) => {
  console.log(master)
  return (
    <Option>
      <div className={cls.master_info}>
        <UserPicture pictureID={master?.pictureID} size="little" />

        <div className="ml-2">
          <span className="text-little">{master?.firstName} {master?.lastName}</span>
        </div>
      </div>

      <span>{master.service?.price} {master.service?.currency}</span>
    </Option>
  )
}

export default SelectMaster
