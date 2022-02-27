import ModalContent from '../../Modal/ModalContent'
import UserPicture from '../../UserPicture/UserPicture'
import cls from './select-master.module.css'


const SelectMaster = ({master, ...props}) => {
  console.log(master)
  return (
    <ModalContent
      {...props}
      className={[cls.select_master, 'modal_paddings', props.className].join(' ')}
    >
      <div className={cls.master_info}>
        <UserPicture pictureID={master?.pictureID} size="little" />

        <div className="ml-2">
          <span className="text-little">{master?.firstName} {master?.lastName}</span>
        </div>
      </div>

      <span>{master.service?.price} {master.service?.currency}</span>
    </ModalContent>
  )
}

export default SelectMaster
