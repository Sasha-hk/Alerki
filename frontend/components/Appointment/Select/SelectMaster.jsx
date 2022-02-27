import ModalContent from '../../Modal/ModalContent'
import UserPicture from '../../UserPicture/UserPicture'


const SelectMaster = ({master, ...props}) => {
  return (
    <div
      {...props}
      className={['modal_paddings', props.className].join(' ')}
    >
      <div>
        <UserPicture pictureID={master?.pictureID} size="little" />

        <div>
          <span>{master?.firstName} {master?.lastName}</span>
          <b>{master?.username}</b>
        </div>
      </div>
    </div>
  )
}

export default SelectMaster
