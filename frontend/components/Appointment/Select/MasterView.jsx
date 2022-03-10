import UserPicture from '../../UserPicture/UserPicture'
import cls from './master-view.module.css'


const MasterView = ({master, ...props}) => {
  return (
    <div
      {...props}
      className={[cls.view_block, props.className].join(' ')}
    >
      <div className={cls?.master_info}>
        <UserPicture
          pictureID={master?.pictureID}
          size='little'
        />

        <span className="text-middle ml-2">{master?.firstName} {master?.lastName}</span>
      </div>

      <span>{master?.service?.price} {master?.service?.currency}</span>
    </div>
  )
}


export default MasterView
